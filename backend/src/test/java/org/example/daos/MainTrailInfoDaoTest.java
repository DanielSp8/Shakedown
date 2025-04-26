package org.example.daos;

import org.example.models.MainTrailInfo;
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
                VALUES ('Appalachian Trail', 'A long, adventurous thru-hike, spanning beautiful views and places!', 'Georgia to Maine', 'hard', 2194, true, 'admin'),
                        ('Hidden Pond', 'A secluded and precious place', 'Ocala, Florida', 'easy', 3.5, false, 'user');""");
    }



    @Test
    @Order(1)
    @DisplayName("GET all trails; verify size")
    void getAllMainTrailsAndVerifySize() {
        List<MainTrailInfo> trails = mainTrailInfoDao.getAllMainTrails();

        assertEquals(2, trails.size());
    }

    @Test
    @Order(2)
    @DisplayName("GET all trails; verify fields within")
    void getALlMainTrailsAndVerifyFields() {
        List<MainTrailInfo> trails = mainTrailInfoDao.getAllMainTrails();

        assertEquals("Hidden Pond", trails.get(1).getTrail_name());
        assertEquals("hard", trails.get(0).getDifficulty());
        assertEquals(false, trails.get(1).getFood_pickups());
        assertEquals(true, trails.get(0).getFood_pickups());
    }

    @Test
    @Order(3)
    @DisplayName("GET trail info by username, verify by trail name")
    void getMainTrailInfoByUsername() {
        List<MainTrailInfo> trails = mainTrailInfoDao.getMainTrailInfoByUsername("admin");
        MainTrailInfo trail = trails.get(0);

        assertEquals("Appalachian Trail", trail.getTrail_name());
    }

    @Test
    @Order(4)
    @DisplayName("GET trail by trail_id 1; verify by a field")
    void getMainTrailInfoByTrailIdOne() {
        List<MainTrailInfo> trail = mainTrailInfoDao.getMainTrailInfoByTrailId(1);
        assertEquals("hard", trail.get(0).getDifficulty());
    }

    @Test
    @Order(5)
    @DisplayName("GET trail by trail_id 2; verify by a field")
    void getMainTrailInfoByTrailIdTwo() {
        List<MainTrailInfo> trail = mainTrailInfoDao.getMainTrailInfoByTrailId(2);
        assertEquals("easy", trail.get(0).getDifficulty());
    }

    @Test
    @Order(6)
    @DisplayName("Create a new trail, fetch, and verify its contents")
    void createMainTrail() {
        MainTrailInfo createdTrail = new MainTrailInfo("Philmont", "A high-adventure camp, full of incredible views in pristine mountains with much wildlife!", "Cimarron, New Mexico", "hard", new BigDecimal(315), true, "admin");
        MainTrailInfo createdTestTrail = mainTrailInfoDao.createMainTrail(createdTrail);

        String fetchSql = "SELECT * FROM main_trail_info WHERE trail_name = ?;";
        MainTrailInfo fetchedTrailObject = jdbcTemplate.queryForObject(fetchSql, (rs, rowNum) -> new MainTrailInfo(
            rs.getInt("trail_id"),
            rs.getString("trail_name"),
                rs.getString("description"), rs.getString("location"),
                rs.getString("difficulty"), rs.getBigDecimal("total_miles"),
                rs.getBoolean("food_pickups"), rs.getString("username")),
                "Philmont");

        assertNotNull(fetchedTrailObject);
        assertEquals(createdTestTrail.getTrail_name(), fetchedTrailObject.getTrail_name());
    }

    @Test
    @Order(7)
    @DisplayName("Update information within an existing trail")
    void updateMainTrail() {
        // Get existing trail
        String fetchSql = "SELECT * FROM main_trail_info WHERE trail_name = ?;";
        MainTrailInfo existingTrailObject = jdbcTemplate.queryForObject(fetchSql, (rs, rowNum) -> new MainTrailInfo(
                        rs.getInt("trail_id"),
                        rs.getString("trail_name"),
                        rs.getString("description"), rs.getString("location"),
                        rs.getString("difficulty"), rs.getBigDecimal("total_miles"),
                        rs.getBoolean("food_pickups"), rs.getString("username")),
                "Hidden Pond");

        // Update trail
        assertNotNull(existingTrailObject);
        MainTrailInfo trailToUpdate = new MainTrailInfo(existingTrailObject.getTrail_id(),"Hidden Pond", "A wonderful place, teaming with life, adventure and offering rich experiences with God in nature.", "Ocala, Florida", "easy", new BigDecimal("3.5"), false, "user");
        MainTrailInfo updatedTrail = mainTrailInfoDao.updateMainTrail(trailToUpdate);
        // Compare the trails for test
        assertNotNull(updatedTrail);
        assertNotNull(existingTrailObject);
        assertNotEquals(existingTrailObject.getDescription(), updatedTrail.getDescription());
    }

    @Test
    @Order(8)
    @DisplayName("Delete a trail by its trail_id; verify its success")
    void deleteMainTrailByIdSuccess() {
        int rowsAffected = mainTrailInfoDao.deleteMainTrail(1);
        assertEquals(1, rowsAffected);
    }

    @Test
    @Order(9)
    @DisplayName("Attempt to delete a trail that doesn't exist")
    void deleteNonExistentTrail() {
        int rowsAffected = mainTrailInfoDao.deleteMainTrail(5001);
        assertEquals(0, rowsAffected);
    }

    @AfterEach
    void tearDown() {
        jdbcTemplate.execute("DROP TABLE main_trail_info");
    }
}