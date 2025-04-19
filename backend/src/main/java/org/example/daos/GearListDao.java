package org.example.daos;

import org.example.models.GearList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

@Component
public class GearListDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public GearListDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Get all gear lists.
     */
    public List<GearList> getGearLists() {
        return jdbcTemplate.query("SELECT * FROM gear_lists ORDER BY item_id;", this::mapToGearList);
    }

    /**
     * Get a gear list, referenced by its trail_id.
     *
     */
    public List<GearList> getGearListByTrailId(int id) {
        try {
            return jdbcTemplate.query("SELECT * FROM gear_lists WHERE trail_id = ?;", this::mapToGearList, id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

    }

    /**
     * Create a new gear list,
     * and return it by its trailId reference.
     */
    @Transactional
    public List<GearList> batchInsertGearListItems(final List<GearList> gearList) {
        String sql = "INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, trail_id) VALUES (?, ?, ?, ?, ?, ?, ?);";
        jdbcTemplate.batchUpdate(sql, gearList, 100,
                (PreparedStatement ps, GearList gear) -> {
                    ps.setString(1, gear.getItem_name());
                    ps.setString(2, gear.getCategory());
                    ps.setString(3, gear.getDescription());
                    ps.setInt(4, gear.getWeight_lbs());
                    ps.setBigDecimal(5, gear.getWeight_oz());
                    ps.setBigDecimal(6, gear.getPrice());
                    ps.setInt(7, gear.getTrail_id());
                }
            );
        return gearList;
    }


    private GearList mapToGearList(ResultSet resultSet, int rowNumber) throws SQLException {
        return new GearList(
                resultSet.getInt("item_id"),
                resultSet.getString("item_name"),
                resultSet.getString("category"),
                resultSet.getString("description"),
                resultSet.getInt("weight_lbs"),
                resultSet.getBigDecimal("weight_oz"),
                resultSet.getBigDecimal("price"),
                resultSet.getInt("trail_id")
        );
    }
}
