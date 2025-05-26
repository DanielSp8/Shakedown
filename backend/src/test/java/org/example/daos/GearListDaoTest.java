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
                description TEXT, weight_lbs INT NOT NULL DEFAULT 0, weight_oz DECIMAL(4,2) NOT NULL DEFAULT 0, price DECIMAL(8,2) NOT NULL DEFAULT 0, private_value BOOLEAN, owner_username VARCHAR(255), backpack_id INT)""");

        jdbcTemplate.execute("""
                INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, private_value, owner_username, backpack_id)\s
                VALUES ('Fly Creek 2 Person 3 Season Tent', 'Shelter',\s
                'The Fly Creek HV UL Solution Dye Two-Person Tent still maintains the ultralight weight that minimalist backpackers look for, but Big Agnes redesigned it with a higher volume to give a comfier sleeping space.',\s
                1, 15, 279.96, false, "Daniel", 1);""");
    }

    @Test
    @Order(1)
    @DisplayName("GET all the gear lists; verify 1st row")
    void testGetGearLists_returnItems() {
        List<GearList> gearLists = gearListDao.getGearLists();

        GearList item = gearLists.get(0);
        assertEquals("Fly Creek 2 Person 3 Season Tent", item.getItemName());
        assertEquals("Shelter", item.getCategory());
        assertEquals(1, item.getWeightLbs());

        BigDecimal expectedWeight_oz = new BigDecimal("15.00");
        BigDecimal actualWeight_oz = item.getWeightOz();
        assertEquals(0, actualWeight_oz.compareTo(expectedWeight_oz));

        BigDecimal expectedPrice = new BigDecimal("279.96");
        BigDecimal actualPrice = item.getPrice();
        assertEquals(0, actualPrice.compareTo(expectedPrice));

        assertEquals(1, item.getBackpackId());
    }

    @Test
    @Order(2)
    @DisplayName("GET backpacks by their id; match size")
    void testGetGearListByBackpackId() {
        List<GearList> gearList = gearListDao.getGearListByBackpackId(1);

        // Verify the size of the gear list:
        assertEquals(1, gearList.size());
    }

    @Test
    @Order(3)
    @DisplayName("GET by trailId; match category info")
    void testGetGearListByBackpackIdMatchCategory() {
        List<GearList> gearList = gearListDao.getGearListByBackpackId(1);

        GearList item = gearList.get(0);
        assertEquals("Shelter", item.getCategory());
    }

    @Test
    @Order(4)
    @DisplayName("GET by nonexistent backpackId")
    void testGetGearListByFalseBackpackId() {
        List<GearList> gearList = gearListDao.getGearListByBackpackId(1001);

        assertTrue(gearList.isEmpty());
    }


    @Test
    @Order(5)
    @DisplayName("Update of a single gear item")
    void updateGearItem() {
        GearList newGearItem = new GearList(1, """
                Fly Creek 2 Person 3 Season Tent""", "Shelter",
                "The Fly Creek HV UL Solution Dye Two-Person Tent still maintains the ultralight weight that minimalist backpackers look for, but Big Agnes redesigned it with a higher volume to give a comfier sleeping space.",
                1, new BigDecimal("15.00"), new BigDecimal("150.00"), false,"Danielson", 1);

        GearList updatedGearList = gearListDao.updateGearItem(newGearItem);

        BigDecimal actualPrice = updatedGearList.getPrice();

        assertEquals(0, actualPrice.compareTo(new BigDecimal("150.00")));
    }

    @Test
    @Order(6)
    @DisplayName("Add a single gear list item")
    void addGearItem() {
        GearList gearItem = new GearList("Toilet Paper", "Hygiene", "Important for deuce dropping in the woods!", 0, new BigDecimal("2"), new BigDecimal("0"), false, "Danielson",1);

        GearList addedItem = gearListDao.addGearItem(gearItem);

        assertEquals(gearItem.getItemName(), addedItem.getItemName());
    }


    @Test
    @Order(7)
    @DisplayName("Delete gear item by its item_id; verify success")
    void deleteGearItem() {
        int rowsAffected = gearListDao.deleteGearItem(1);
        assertEquals(1, rowsAffected);
    }

    @Test
    @Order(8)
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
