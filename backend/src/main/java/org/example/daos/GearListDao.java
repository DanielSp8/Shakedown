package org.example.daos;

import org.example.models.GearList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
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

    GearListDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     *
     * @return List of all gear that matches the item_id
     */
    public List<GearList> getGearLists() {
        return jdbcTemplate.query("SELECT * FROM gear_lists ORDER BY item_id;", this::mapToGearList);
    }


    public List<GearList> searchForGear(String field, String searchByValue, String orderByField, String sortDirection) {
        List<String> allowedColumns = List.of(
                "item_id",
                "item_name",
                "category",
                "description",
                "weight_lbs",
                "weight_oz",
                "price",
                "private_value",
                "owner_username",
                "need_to_purchase",
                "backpack_id");

        List<String> allowedDirections = List.of("ASC", "DESC");

        // Validate the input
        if (!allowedColumns.contains(field) || !allowedColumns.contains(orderByField)) {
            throw new IllegalArgumentException("Invalid field name");
        }

        // Verify the sort direction is valid
        if (!allowedDirections.contains(sortDirection)) {
            throw new IllegalArgumentException("Invalid sort direction");
        }

        String sql = String.format("SELECT * FROM gear_lists WHERE %s = ? ORDER BY %s %s", field, orderByField, sortDirection);

        return jdbcTemplate.query(sql, this::mapToGearList, searchByValue);
    }

    public List<GearList> searchThroughCategoryForWord(String columnToSearch, String word, String orderByField, String sortDirection) {
        List<String> allowedColumns = List.of(
                "item_name",
                "category",
                "description",
                "owner_username");

        // Verify the column to search is valid
        if (!allowedColumns.contains(columnToSearch)) {
            throw new IllegalArgumentException(("Invalid field name"));
        }

        List<String> allowedDirections = List.of("ASC", "DESC");

        // Verify the sort direction is valid
        if (!allowedDirections.contains(sortDirection)) {
            throw new IllegalArgumentException("Invalid sort direction");
        }

        String sql = String.format("SELECT * FROM gear_lists WHERE %s LIKE ? ORDER BY %s %s", columnToSearch, orderByField, sortDirection);
        String wordWithWildCardsToSearch = "%" + word + "%";

        return jdbcTemplate.query(sql, this::mapToGearList, wordWithWildCardsToSearch);
    }

    public List<GearList> returnAllGearThroughSearch(String orderByField, String sortDirection) {
        List<String> allowedDirections = List.of("ASC", "DESC");

        // Verify the sort direction is valid
        if (!allowedDirections.contains(sortDirection)) {
            throw new IllegalArgumentException("Invalid sort direction");
        }

        String sql = String.format("SELECT * FROM gear_lists ORDER BY %s %s", orderByField, sortDirection);
        return jdbcTemplate.query(sql, this::mapToGearList);
    }

    /**
     *
     * @param backpackId references the backpack in which the gear is for
     * @return List with the gear from a specific backpackId
     */

    public List<GearList> getGearListByBackpackId(int backpackId) {
        return jdbcTemplate.query("SELECT * FROM gear_lists WHERE backpack_id = ?;", this::mapToGearList, backpackId);
    }

    public GearList getSingleGearItem(int itemId) {
        return jdbcTemplate.queryForObject("SELECT * FROM gear_lists WHERE item_id = ?;", this::mapToGearList, itemId);
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
     * @param gearItem object for updating a specific gear list item
     * @return null if no update or the gearItem object passed in
     */
    public GearList updateGearItem (GearList gearItem){
        String sql = """
                UPDATE gear_lists SET item_name = ?, category = ?, description = ?, weight_lbs = ?, weight_oz = ?, price = ?, backpack_id = ?,\s
                private_value = ?, need_to_purchase = ?, owner_username = ? WHERE item_id = ?;""";

        int rowsAffected = jdbcTemplate.update(sql,
                gearItem.getItemName(),
                gearItem.getCategory(),
                gearItem.getDescription(),
                gearItem.getWeightLbs(),
                gearItem.getWeightOz(),
                gearItem.getPrice(),
                gearItem.getBackpackId(),
                gearItem.getPrivateValue(),
                gearItem.getNeedToPurchase(),
                gearItem.getOwnerUsername(),
                gearItem.getItemId());

        if (rowsAffected == 0) {
            return null;
        } else {
            return gearItem;
        }
    }

    /**
     *
     * @param gearItem object for adding a new gear item to the list
     * @return null if no added gear item or the gearItem object passed in
     */
    public GearList addGearItem(GearList gearItem) {
        String sql = "INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, private_value, owner_username, need_to_purchase, backpack_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        int rowsAffected = jdbcTemplate.update(sql,
                gearItem.getItemName(),
                gearItem.getCategory(),
                gearItem.getDescription(),
                gearItem.getWeightLbs(),
                gearItem.getWeightOz(),
                gearItem.getPrice(),
                gearItem.getPrivateValue(),
                gearItem.getOwnerUsername(),
                gearItem.getNeedToPurchase(),
                gearItem.getBackpackId());

        return (rowsAffected > 0) ? gearItem : null;
    }


    /**
     *
     * @param resultSet object that holds data retrieved from SQL query
     * @param rowNumber integer for the row number being processed
     * @return a gearList object that has been retrieved from SQL
     * @throws SQLException covers errors that could happen in dealing with the database
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
                resultSet.getBoolean("private_value"),
                resultSet.getString("owner_username"),
                resultSet.getBoolean("need_to_purchase"),
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

