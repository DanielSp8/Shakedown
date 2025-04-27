package org.example.daos;

import org.example.models.Backpack;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BackpackDaoTest {

    @Autowired
    private BackpackDao backpackDao;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setUp() {
        jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS backpacks (backpack_id INT AUTO_INCREMENT PRIMARY KEY,
                                                         backpack_name VARCHAR(25) NOT NULL,
                                                         owner_username VARCHAR(255),
                                                         location VARCHAR(100),
                                                         trip_date DATE)""");
        jdbcTemplate.execute("""
                INSERT INTO backpacks (backpack_name, owner_username, location, trip_date)
                VALUES ('AT-Thru Hike', 'admin', 'Georgia to Maine', '2026-09-03'),
                        ('PCT-Thru Hike', 'admin', 'Campo, California to Manning Park, British Columbia', '2027-09-03'),
                        ('Hidden Pond', 'user', 'Ocala, Florida', '2026-08-13');""");
    }

    @AfterEach
    void tearDown() {
        jdbcTemplate.execute("DROP TABLE backpacks");
    }

    @Test
    @Order(1)
    @DisplayName("GET all the backpacks; display each name; verify by size")
    void getBackpack() {
        List<Backpack> backpacks = backpackDao.getBackpacks();
        for (Backpack backpack : backpacks) {
            System.out.println(backpack.getBackpackName());
        }
        assertEquals(3, backpacks.size());
    }

    @Test
    @Order(2)
    @DisplayName("GET backpacks by username; verify by size")
    void getBackpacksByUsername() {
        List<Backpack> backpacks = backpackDao.getBacksByUsername("admin");
        assertEquals(2, backpacks.size());
    }

    @Test
    @Order(3)
    @DisplayName("GET a single backpack by its id")
    void getBackpacksById() {
        Backpack backpack = backpackDao.getBackpackByBackpackId(2);
        assertEquals("PCT-Thru Hike", backpack.getBackpackName());
    }

    @Test
    @Order(4)
    @DisplayName("UPDATE a backpack; check that the old contrasts the new")
    void updateBackpack() {
        Backpack oldBackpack = backpackDao.getBackpackByBackpackId(3);
        Backpack newBackpack = new Backpack(3, "The Hidden Pond", "user", "Ocala, Florida", java.sql.Date.valueOf("2025-08-13"));
        Backpack updatedBackpack = backpackDao.updateBackpack(newBackpack, "user");

        assertNotEquals(oldBackpack.getBackpackName(), updatedBackpack.getBackpackName());
    }

    @Test
    @Order(5)
    @DisplayName("CREATE a new backpack; verify its name")
    void addBackpack() {
        String username = "user";
        Backpack newBackpack = new Backpack("Philmont","Cimmaron, New Mexico", java.sql.Date.valueOf("2025-09-03"));
        Backpack addedBackpack = backpackDao.addBackpack(newBackpack, username);

        assertEquals(newBackpack.getBackpackName(), addedBackpack.getBackpackName());
        assertEquals(newBackpack.getLocation(), addedBackpack.getLocation());
    }

    @Test
    @Order(6)
    @DisplayName("DELETE a backpack by its id; verify its success")
    void deleteBackpack() {
        int rowsAffected = backpackDao.deleteBackpack(2);
        assertEquals(1, rowsAffected);
    }

    @Test
    @Order(7)
    @DisplayName("Attempt to delete a backpack by id that doesn't exist")
    void deleteNonExistentBackpack() {
        int rowsAffected = backpackDao.deleteBackpack(1001);
        assertEquals(0, rowsAffected);
    }
}