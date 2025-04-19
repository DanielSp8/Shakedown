package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.MainTrailInfo;
import org.springframework.beans.factory.annotation.Autowired;
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
     * Get all Main Trail Info lists.
     */
    public List<MainTrailInfo> getMainTrailLists() {
        return jdbcTemplate.query("SELECT * FROM main_trail_info ORDER BY trail_id;", this::mapToMainTrailInfo);
    }

    /**
     * Get the trails by the username
     *
     */
    public List<MainTrailInfo> getMainTrailInfoByUsername(String username) {
        try {
            return jdbcTemplate.query("SELECT * FROM main_trail_info WHERE username = ?;", this::mapToMainTrailInfo, username);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    /**
     * Return a single trail by its trail_id
     */
    public List<MainTrailInfo> getMainTrailInfoByTrailId(int trailId) {
        try {
            return jdbcTemplate.query("SELECT * FROM main_trail_info WHERE trail_id = ?;", this::mapToMainTrailInfo, trailId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    /**
     * Create a new Main Trail Info,
     *  and return it by its trail_id reference.
     */
//    public MainTrailInfo createMainTrailInfo(MainTrailInfo mainTrailInfo) {
//        String sql = "INSERT INTO main_trail_info (trail_id, trail_name, description, location, difficulty, total_miles, food_pickups, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
//        try {
//            int trailId = mainTrailInfo.getTrail_id();
//            jdbcTemplate.update(sql, mainTrailInfo.getTrail_id(), mainTrailInfo.getTrail_name(), mainTrailInfo.getDescription(), mainTrailInfo.getLocation(), mainTrailInfo.getDifficulty(), mainTrailInfo.getTotal_miles(), mainTrailInfo.getFood_pickups(), mainTrailInfo.getUsername());
//            return <MainTrailInfo> getMainTrailInfoByTrailId(trailId);
//        } catch (EmptyResultDataAccessException e) {
//            throw new DaoException("Failed to create a new main trail list.");
//        }
//
//
//    }


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
}
