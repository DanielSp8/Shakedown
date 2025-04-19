package org.example.daos;

import org.example.models.MainTrailInfo;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class MainTrailInfoDaoTest {

    @Autowired
    private MainTrailInfoDao mainTrailInfoDao;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setUp() {
        jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS main_trail_info (trail_id INT AUTO_INCREMENT PRIMARY KEY,
                    trail_name VARCHAR(100) NOT NULL,
                    description TEXT,
                    location VARCHAR(100),
                    difficulty VARCHAR(10),
                    total_miles DECIMAL(6,2),
                    food_pickups BOOLEAN,
                    username VARCHAR(255)
                );""");

        jdbcTemplate.execute("""
                INSERT INTO main_trail_info (trail_name, description, location, difficulty, total_miles, food_pickups, username)\s
                VALUES ('Appalachian Trail', 'A long, adventurous thru-hike, spanning beautiful views and places!', 'Georgia to Maine', 'hard', 2194, true, 'admin');""");
    }



    @Test
    @Order(1)
    @DisplayName("Checks the fields of the trail retrieved from the table.")
    void getMainTrailLists() {
        List<MainTrailInfo> trails = mainTrailInfoDao.getMainTrailLists();

        // Verify the name of the trail:
        assertEquals("Appalachian Trail", trails.get(0).getTrail_name());
        // Verify the mileage of this trail:
        BigDecimal expectedMileage = new BigDecimal(2194);
        BigDecimal actualMileage = trails.get(0).getTotal_miles();
        assertEquals(0, actualMileage.compareTo(expectedMileage));
    }

    @Test
    @Order(2)
    @DisplayName("Collect trail info by username, verify by trail name")
    void getMainTrailInfoByUsername() {
        List<MainTrailInfo> trails = mainTrailInfoDao.getMainTrailInfoByUsername("admin");
        // Verify the name of the trail:
        assertEquals("Appalachian Trail", trails.get(0).getTrail_name());
    }

    @Test
    @Order(3)
    @DisplayName("Collect trail info by trail_id, verify by difficulty field.")
    void getMainTrailInfoByTrailId() {
        List<MainTrailInfo> trails = mainTrailInfoDao.getMainTrailInfoByTrailId(1);
        // Verify trail by difficulty field.
        assertEquals("hard", trails.get(0).getDifficulty());
    }

    @AfterEach
    void tearDown() {
        jdbcTemplate.execute("DROP TABLE main_trail_info");
    }
}