package org.example.daos;

import org.example.models.GearList;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

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
                description TEXT, weight_lbs INT, weight_oz DECIMAL(5,2), price DECIMAL(10,2), trail_id INT);""");

        jdbcTemplate.execute("""
                INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, trail_id)\s
                VALUES ('Fly Creek 2 Person 3 Season Tent', 'Shelter',\s
                'The Fly Creek HV UL Solution Dye Two-Person Tent still maintains the ultralight weight that minimalist backpackers look for, but Big Agnes redesigned it with a higher volume to give a comfier sleeping space.',\s
                1, 15, 279.96, 1);""");
    }

    @Test
    @Order(1)
    @DisplayName("Checks for all the gear fields in the 1st row.")
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
    }

    @Test
    @Order(2)
    @DisplayName("Matches the information received by a single trailId")
    void testGetGearListByTrailId() {
        List<GearList> gearList = gearListDao.getGearListByTrailId(1);

        // Verify the items in the gear list:
        assertEquals(1, gearList.size());
    }

    @Test
    @Order(3)
    @DisplayName("Checking for a search by a non-existent single trailId")
    void testGetGearListByFalseTrailId() {
        List<GearList> gearList = gearListDao.getGearListByTrailId(1001);

        assertTrue(gearList.isEmpty());
    }

    @Test
    @Order(4)
    @DisplayName("Verifying that the batch insert of multiple items works on the gear_lists table.")
    void batchInsertGearListItems() {
        List<GearList> newItems = List.of(
                new GearList(0, "Decatour Backpack", "Backpack", "A great backpack I currently own.", 1, new BigDecimal("3.4"), new BigDecimal("0"), 2),
                new GearList(0, "Hennessy Hammock", "Shelter", "A tent/hammock I sometimes use.", 1, new BigDecimal("2.5"), new BigDecimal("0"), 2),
                new GearList(0, "Marmot Sleeping Bag", "Sleep System", "An older sleeping bag I currently own.  It still has some use in it.", 2, new BigDecimal("5"), new BigDecimal(0), 2)
        );

        List<GearList> insertedItems = gearListDao.batchInsertGearListItems(newItems);

        // Check if the return list matches the inserted one:
        assertEquals(3, insertedItems.size());

        // Match the size of the database:
        List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT * from gear_lists");
        assertEquals(4, rows.size());

        // Match some values within the db:
        assertEquals("Hennessy Hammock", rows.get(2).get("item_name"));
        assertEquals("Backpack", rows.get(1).get("category"));
    }

    @AfterEach
    void tearDown() {
        jdbcTemplate.execute("DROP TABLE gear_lists");
    }

}