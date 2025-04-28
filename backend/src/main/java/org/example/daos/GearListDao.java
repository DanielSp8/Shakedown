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

    /**
     *
     * @param dataSource object that holds database connection information
     */
    @Autowired
    public GearListDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     *
     * @return List of all gear that matches the item_id
     */
    public List<GearList> getGearLists() {
        return jdbcTemplate.query("SELECT * FROM gear_lists ORDER BY item_id;", this::mapToGearList);
    }

    /**
     *
     * @param backpackId references the backpack in which the gear is for
     * @return List with the gear from a specific backpackId
     */

    public List<GearList> getGearListByBackpackId(int backpackId) {
        return jdbcTemplate.query("SELECT * FROM gear_lists WHERE backpack_id = ?;", this::mapToGearList, backpackId);
    }

    /**
     *
     * @param category holds the type of gear item it is
     * @return List with all the specific category passed in
     */
    public List<GearList> getGearListByCategory(String category) {
        try {
            return jdbcTemplate.query("SELECT * FROM gear_lists WHERE category = ?;", this::mapToGearList, category);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    /**
     *
     * @param gearItem object for updating a specific gear list item
     * @return null if no update or the gearItem object passed in
     */

    public GearList updateGearItem (GearList gearItem){
        String sql = """
                UPDATE gear_lists SET item_name = ?, category = ?, description = ?, weight_lbs = ?, weight_oz = ?, price = ?\s
                WHERE backpack_id = ?;""";

        int rowsAffected = jdbcTemplate.update(sql,
                gearItem.getItemName(),
                gearItem.getCategory(),
                gearItem.getDescription(),
                gearItem.getWeightLbs(),
                gearItem.getWeightOz(),
                gearItem.getPrice(),
                gearItem.getBackpackId());

        if (rowsAffected == 0) {
            return null;
        } else {
            return gearItem;
        }
    }

    /**
     *
     * @param gearList object(s) holding multiple gear list items and their information
     * @return List with the gearList(s) which were passed in
     */
    @Transactional
    public List<GearList> batchInsertGearListItems(final List<GearList> gearList) {
        String sql = "INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, backpack_id) VALUES (?, ?, ?, ?, ?, ?, ?);";
        jdbcTemplate.batchUpdate(sql, gearList, 100,
                (PreparedStatement ps, GearList gear) -> {
                    ps.setString(1, gear.getItemName());
                    ps.setString(2, gear.getCategory());
                    ps.setString(3, gear.getDescription());
                    ps.setInt(4, gear.getWeightLbs());
                    ps.setBigDecimal(5, gear.getWeightOz());
                    ps.setBigDecimal(6, gear.getPrice());
                    ps.setInt(7, gear.getBackpackId());
                }
            );
        return gearList;
    }

    /**
     *
     * @param resultSet object that holds data retrieved from SQL query
     * @param rowNumber integer for the row number being processed
     * @return a gearList object that has been retrieved from SQL
     * @throws SQLException covers errors that could happen with dealing with the database
     */
    private GearList mapToGearList(ResultSet resultSet, int rowNumber) throws SQLException {
        return new GearList(
                resultSet.getInt("item_id"),
                resultSet.getString("item_name"),
                resultSet.getString("category"),
                resultSet.getString("description"),
                resultSet.getInt("weight_lbs"),
                resultSet.getBigDecimal("weight_oz"),
                resultSet.getBigDecimal("price"),
                resultSet.getInt("backpack_id")
        );
    }


    /**
     *
     * @param itemId the specific id for the gear list item to be deleted
     * @return an integer: 0 if nothing deleted; 1 if delete successful.
     */
    public int deleteGearItem(int itemId) {
        String sql = "DELETE FROM gear_lists WHERE item_id = ?;";
        return jdbcTemplate.update(sql, itemId);
    }
}

