package org.example.daos;

import org.example.models.GearList;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class GearListDaoTest {

    @Autowired
    private GearListDao gearListDao;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setUp() {
        jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS gear_lists (item_id INT PRIMARY KEY AUTO_INCREMENT, item_name VARCHAR(100), category VARCHAR(100),\s
                description TEXT, weight_lbs INT, weight_oz DECIMAL(5,2), price DECIMAL(10,2), trail_id INT, username VARCHAR(255) NOT NULL)""");

        jdbcTemplate.execute("""
                INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, trail_id, username)\s
                VALUES ('Fly Creek 2 Person 3 Season Tent', 'Shelter',\s
                'The Fly Creek HV UL Solution Dye Two-Person Tent still maintains the ultralight weight that minimalist backpackers look for, but Big Agnes redesigned it with a higher volume to give a comfier sleeping space.',\s
                1, 15, 279.96, 1, "admin");""");
    }

    @Test
    @Order(1)
    @DisplayName("GET all the gear fields in the 1st row")
    void testGetGearLists_returnItems() {
        List<GearList> gearLists = gearListDao.getGearLists();

        GearList item = gearLists.get(0);
        assertEquals("Fly Creek 2 Person 3 Season Tent", item.getItem_name());
        assertEquals("Shelter", item.getCategory());
        assertEquals(1, item.getWeight_lbs());

        BigDecimal expectedWeight_oz = new BigDecimal("15.00");
        BigDecimal actualWeight_oz = item.getWeight_oz();
        assertEquals(0, actualWeight_oz.compareTo(expectedWeight_oz));

        BigDecimal expectedPrice = new BigDecimal("279.96");
        BigDecimal actualPrice = item.getPrice();
        assertEquals(0, actualPrice.compareTo(expectedPrice));

        assertEquals(1, item.getTrail_id());
        assertEquals("admin", item.getUsername());
    }

    @Test
    @Order(2)
    @DisplayName("Matches the information by its size received by a single trail_Id")
    void testGetGearListByTrailIdBySize() {
        List<GearList> gearList = gearListDao.getGearListByTrailId(1);

        // Verify the size of the gear list:
        assertEquals(1, gearList.size());
    }

    @Test
    @Order(3)
    @DisplayName("Matches the information received by a single trail_Id")
    void testGetGearListByTrailIdInformation() {
        List<GearList> gearList = gearListDao.getGearListByTrailId(1);

        // Verify by the gear by an item in its list
        GearList item = gearList.get(0);
        assertEquals("Shelter", item.getCategory());
    }

    @Test
    @Order(4)
    @DisplayName("Checking for a GET request for a non-existent single trail_Id")
    void testGetGearListByFalseTrailId() {
        List<GearList> gearList = gearListDao.getGearListByTrailId(1001);

        assertTrue(gearList.isEmpty());
    }

    @Test
    @Order(5)
    @DisplayName("Checking update of multiple items into gear_lists")
    void batchInsertGearListItems() {
        // Create a list to insert into test table
        String username = "user";
        List<GearList> newItems = List.of(
                new GearList("Decatur Backpack", "Backpack", "A great backpack I currently own.", 1, new BigDecimal("3.4"), new BigDecimal("0"), 2, username),
                new GearList("Hennessy Hammock", "Shelter", "A tent/hammock I sometimes use.", 1, new BigDecimal("2.5"), new BigDecimal("0"),2, username),
                new GearList("Marmot Sleeping Bag", "Sleep System", "An older sleeping bag I currently own.  It still has some use in it.", 2, new BigDecimal("5"), new BigDecimal(0), 2, username)
        );

        List<GearList> insertedItems = gearListDao.batchInsertGearListItems(newItems, username);


        assertEquals(newItems.size(), insertedItems.size());
        }

    @Test
    @Order(6)
    @DisplayName("Checking update of a single gear item")
    void updateGearItem() {
        // Create an item to update the previous one in the gear list
        GearList newGearItem = new GearList(1, """
                Fly Creek 2 Person 3 Season Tent""", "Shelter",
                "The Fly Creek HV UL Solution Dye Two-Person Tent still maintains the ultralight weight that minimalist backpackers look for, but Big Agnes redesigned it with a higher volume to give a comfier sleeping space.",
                1, new BigDecimal("15.00"), new BigDecimal("150.00"), 1, "admin");

        GearList updatedGearList = gearListDao.updateGearItem(newGearItem);

        BigDecimal actualPrice = updatedGearList.getPrice();

        // Verify the updated price matches
        assertEquals(0, actualPrice.compareTo(new BigDecimal("150.00")));
    }

    @Test
    @Order(7)
    @DisplayName("Insert new gear item and verify it was added correctly")
    void addGearItemAndFetchItem() {
        GearList newGearItem = new GearList("Small Candle", "Emergencies", "A small candle to help start a fire in wet and difficult circumstances.", 0, new BigDecimal("2.50"), new BigDecimal("3.99"), 1, "admin");

        GearList addedGearItem = gearListDao.addGearItem(newGearItem);

        assertNotNull(addedGearItem);

        // Get the object that was just added to the test db:
        String fetchSql = "SELECT * FROM gear_lists WHERE item_name = ?;";
        GearList fetchedObject = jdbcTemplate.queryForObject(fetchSql, (resultSet, rowNum) -> new GearList(
                resultSet.getInt("item_id"),
                resultSet.getString("item_name"),
                resultSet.getString("category"),
                resultSet.getString("description"),
                resultSet.getInt("weight_lbs"),
                resultSet.getBigDecimal("weight_oz"),
                resultSet.getBigDecimal("price"),
                resultSet.getInt("trail_id"),
                        resultSet.getString("username")),

                "Small Candle");

        assertNotNull(fetchedObject);
        assertEquals("Small Candle", fetchedObject.getItem_name());
        assertEquals("Emergencies", fetchedObject.getCategory());
        assertEquals(new BigDecimal("3.99"), fetchedObject.getPrice());
    }

    // Run another test, to check if null(?)

    @Test
    @Order(8)
    @DisplayName("Delete a gear item by its item_id; verify its success")
    void deleteGearItem() {
        int rowsAffected = gearListDao.deleteGearItem(1);
        assertEquals(1, rowsAffected);
    }

    @Test
    @Order(9)
    @DisplayName("Attempt to delete a gear item that doesn't exist.")
    void deleteNonExistentGearItem() {
        int rowsAffected = gearListDao.deleteGearItem(5001);
        assertEquals(0, rowsAffected);
    }

    @AfterEach
    void tearDown() {
        jdbcTemplate.execute("DROP TABLE gear_lists");
    }



}
