package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.MainTrailInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class MainTrailInfoDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MainTrailInfoDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Get all Main Trail Info lists, in ascending order (by the trail_id)
     */
    public List<MainTrailInfo> getAllMainTrails() {
        return jdbcTemplate.query("SELECT * FROM main_trail_info ORDER BY trail_id;", this::mapToMainTrailInfo);
    }

    /**
     * Get the trails by the username
     *
     */
    public List<MainTrailInfo> getMainTrailInfoByUsername(String username) {
        return jdbcTemplate.query("SELECT * FROM main_trail_info WHERE username = ?;", this::mapToMainTrailInfo, username);

    }

    /**
     * Return a single trail by its trail_id
     */
    public List<MainTrailInfo> getMainTrailInfoByTrailId(int trailId) {
        return jdbcTemplate.query("SELECT * FROM main_trail_info WHERE trail_id = ?;", this::mapToMainTrailInfo, trailId);
    }

    /**
     * Create new Main Trail Info,
     *  and return it.
     */
    public MainTrailInfo createMainTrail(MainTrailInfo createdTrail) {
        String sql = "INSERT INTO main_trail_info (trail_name, description, location, difficulty, total_miles, food_pickups, username) VALUES (?, ?, ?, ?, ?, ?, ?);";

        int rowsAffected = jdbcTemplate.update(sql,
                createdTrail.getTrail_name(),
                createdTrail.getDescription(),
                createdTrail.getLocation(),
                createdTrail.getDifficulty(),
                createdTrail.getTotal_miles(),
                createdTrail.getFood_pickups(),
                createdTrail.getUsername()
            );

        if (rowsAffected == 0) {
            return null;
        } else {
            return createdTrail;
        }
    }

    public MainTrailInfo updateMainTrail(MainTrailInfo trailToUpdate) {
        String sql = """
                UPDATE main_trail_info SET trail_name = ?, description = ?, location = ?, total_miles = ?, food_pickups = ?, username = ?\s
                 WHERE trail_id = ?;""";

        int rowsAffected = jdbcTemplate.update(sql,
                trailToUpdate.getTrail_name(),
                trailToUpdate.getDescription(),
                trailToUpdate.getLocation(),
                trailToUpdate.getTotal_miles(),
                trailToUpdate.getFood_pickups(),
                trailToUpdate.getUsername(),
                trailToUpdate.getTrail_id());

        if (rowsAffected == 0) {
            return null;
        } else {
            return trailToUpdate;
        }
    }


    private MainTrailInfo mapToMainTrailInfo(ResultSet resultSet, int rowNumber) throws SQLException {
        return new MainTrailInfo(
                resultSet.getInt("trail_id"),
                resultSet.getString("trail_name"),
                resultSet.getString("description"),
                resultSet.getString("location"),
                resultSet.getString("difficulty"),
                resultSet.getBigDecimal("total_miles"),
                resultSet.getBoolean("food_pickups"),
                resultSet.getString("username")
        );
    }

    public int deleteMainTrail(int trailId) {
        String sql = "DELETE FROM main_trail_info WHERE trail_id = ?;";
        return jdbcTemplate.update(sql, trailId);
    }
}
