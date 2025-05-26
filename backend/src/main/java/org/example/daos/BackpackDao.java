package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Backpack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class BackpackDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BackpackDao(DataSource dataSource) {this.jdbcTemplate = new JdbcTemplate(dataSource);}

    /**
     *
     * @return All of backpacks stored
     */
    public List<Backpack> getBackpacks() {
        return jdbcTemplate.query("SELECT * FROM backpacks ORDER BY backpack_id;", this::mapToBackpack);
    }


    /**
     *
     * @param username The username currently logged in
     * @return All the backpacks stored under this specific username
     */
    public List<Backpack> getBacksByUsername(String username) {
        return jdbcTemplate.query("SELECT * FROM backpacks WHERE owner_username = ?;", this::mapToBackpack, username);
    }

    /**
     *
     * @param backpackId The id of the backpack to retrieve
     * @return A backpack object with this specific backpackId
     */
    public Backpack getBackpackByBackpackId(int backpackId) {
        String sql = "SELECT * FROM backpacks WHERE backpack_id = ?;";
        return jdbcTemplate.queryForObject(sql, this::mapToBackpack, backpackId);
    }

    /**
     *
     * @param resultSet used to map data to the backpack object
     * @param rowNumber the index number of current row being mapped
     * @return  A backpack object
     * @throws SQLException
     */
    private Backpack mapToBackpack(ResultSet resultSet, int rowNumber) throws SQLException {

        return new Backpack(
                resultSet.getInt("backpack_Id"),
                resultSet.getString("backpack_name"),
                resultSet.getString("owner_username"),
                resultSet.getString("location"),
                resultSet.getBoolean("private_value")
        );
    }

    /**
     *
     * @param backpack The backpack to update
     * @param username The username to update within this backpack
     * @return null if nothing is affected (a failed update
     *          or the backpack object sent to update)
     */
    public Backpack updateBackpack(Backpack backpack, String username) {
        String sql = """
                UPDATE backpacks SET backpack_name = ?, owner_username = ?, location = ?,
                 private_value = ? WHERE backpack_id = ?;""";

        int rowsAffected = jdbcTemplate.update(sql,
                backpack.getBackpackName(),
                username,
                backpack.getLocation(),
                backpack.getPrivateValue(),
                backpack.getBackpackId());

        if (rowsAffected == 0) {
            return null;
        } else {
            return backpack;
        }
    }

    /**
     *
     * @param backpack object to add to database
     * @param username current user logged in to store in backpack being created
     *                  and added to database
     * @return  A null value if nothing was affected (a failure),
     *           or the backpack object originally passed
     */
    public Backpack addBackpack(Backpack backpack, String username) {
        String sql = """
                INSERT INTO backpacks (backpack_name, owner_username, location, private_value)
                VALUES (?, ?, ?, ?);""";

        int rowsAffected = jdbcTemplate.update(sql,
                backpack.getBackpackName(),
                username,
                backpack.getLocation(),
                backpack.getPrivateValue());

        if (rowsAffected == 0) {
            return null;
        } else {
            return backpack;
        }
    }

    /**
     *
     * @param backpackId the specific id of backpack to delete
     * @return An error message if the delete fails
     *          or the number of rows affected, which would be 1
     */
    public int deleteBackpack(int backpackId) {
        String sql = "DELETE FROM backpacks WHERE backpack_id = ?;";
        return jdbcTemplate.update(sql, backpackId);
    }
}

