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

    public List<GearList> getGearListByUsername(String username) {
        try {
            return jdbcTemplate.query("SELECT * FROM gear_lists WHERE username = ?;", this::mapToGearList, username);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    /**
     * Update a specific gear item in the gear list.
     *  To do this, I'll update all the fields in the row, by using its getters.
     *   If the rowsAffected = 0, then it did not properly update, and will send an error message.
     *    On the frontend--I'll use a screen wherein the user accesses all the field info,
     *     editing the one(s) they want to update.
     *      This will send the gearItem constructor to the backend, thus:  here we are!
     */
    public GearList updateGearItem (GearList gearItem){
        String sql = """
                UPDATE gear_lists SET item_name = ?, category = ?, description = ?, weight_lbs = ?, weight_oz = ?, price = ?,\s
                trail_id = ?, username = ? WHERE item_id = ?;""";

        int rowsAffected = jdbcTemplate.update(sql,
                gearItem.getItem_name(),
                gearItem.getCategory(),
                gearItem.getDescription(),
                gearItem.getWeight_lbs(),
                gearItem.getWeight_oz(),
                gearItem.getPrice(),
                gearItem.getTrail_id(),
                gearItem.getUsername(),
                gearItem.getItem_id());

        if (rowsAffected == 0) {
            return null;
        } else {
            return gearItem;
        }
    }

    /**
     *  This function adds a single gear item to a specific gear list.
     *   On the frontend, I'll need a place for the user to enter in new data for this,
     *    which will submit here:
     */
    public GearList addGearItem(GearList gearItem) {
        String sql = """
                INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, trail_id, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                """;

        int rowsAffected = jdbcTemplate.update(sql,
                gearItem.getItem_name(),
                gearItem.getCategory(),
                gearItem.getDescription(),
                gearItem.getWeight_lbs(),
                gearItem.getWeight_oz(),
                gearItem.getPrice(),
                gearItem.getTrail_id(),
                gearItem.getUsername()
        );

        if (rowsAffected == 0) {
            return null;
        } else {
            return gearItem;
        }
    }

    /**
     * Create a new gear list,
     *  and return it by its trailId reference.
     */
    @Transactional
    public List<GearList> batchInsertGearListItems(final List<GearList> gearList, String username) {
        String sql = "INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, trail_id, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
        jdbcTemplate.batchUpdate(sql, gearList, 100,
                (PreparedStatement ps, GearList gear) -> {
                    ps.setString(1, gear.getItem_name());
                    ps.setString(2, gear.getCategory());
                    ps.setString(3, gear.getDescription());
                    ps.setInt(4, gear.getWeight_lbs());
                    ps.setBigDecimal(5, gear.getWeight_oz());
                    ps.setBigDecimal(6, gear.getPrice());
                    ps.setInt(7, gear.getTrail_id());
                    ps.setString(8, username);
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
                resultSet.getInt("trail_id"),
                resultSet.getString("username")
        );
    }


    /**
     *  Remove a gear item from its gear list by its id.
     */
    public int deleteGearItem(int item_id) {
        String sql = "DELETE FROM gear_lists WHERE item_id = ?;";
        return jdbcTemplate.update(sql, item_id);
    }


}

