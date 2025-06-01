package org.example.daos;

import io.swagger.v3.oas.annotations.media.DependentSchema;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.example.models.Backpack;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class BackpackDaoTest {

    @Test
    @DisplayName("getBackpacks returns expected list")
    void getBackpacks() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        BackpackDao dao = new BackpackDao(mockJdbcTemplate);

        Backpack expected = new Backpack(
                1,
                "Arc Teryx Backpack",
                "Danny",
                "Grandview, MO",
                false
        );

        String expectedSql = "SELECT * FROM backpacks ORDER BY backpack_id;";

        when(mockJdbcTemplate.query(
                eq(expectedSql),
                any(RowMapper.class)
        )).thenReturn(List.of(expected));

        // Act
        List<Backpack> result = dao.getBackpacks();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Arc Teryx Backpack", result.get(0).getBackpackName());
        assertEquals("Grandview, MO", result.get(0).getLocation());

        verify(mockJdbcTemplate).query(
                eq(expectedSql),
                any(RowMapper.class)
        );

    }

    @Test
    @DisplayName("getBackpacksByUsername returns the expected result")
    void getBacksByUsername() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        BackpackDao dao = new BackpackDao(mockJdbcTemplate);

        Backpack expected = new Backpack(
                2,
                "Osprey Backpack",
                "Danielson",
                "Alaska",
                false
        );

        String username = "Danielson";
        String expectedSql = "SELECT * FROM backpacks WHERE owner_username = ?;";

        when(mockJdbcTemplate.query(
                eq(expectedSql),
                any(RowMapper.class),
                eq(username)
        )).thenReturn(List.of(expected));

        List<Backpack> result = dao.getBacksByUsername(username);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Osprey Backpack", result.get(0).getBackpackName());
        assertEquals("Danielson", result.get(0).getOwnerUsername());

        verify(mockJdbcTemplate).query(
                eq(expectedSql),
                any(RowMapper.class),
                eq(username)
        );

    }

    @Test
    @DisplayName("getBackpacksByBackpackId returns the expected result")
    void getBackpackByBackpackId() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        BackpackDao dao = new BackpackDao(mockJdbcTemplate);

        Backpack expected = new Backpack(
                3,
                "REI Backpack",
                "Dan",
                "Colorado",
                true
        );

        int backpackId = 3;
        String expectedSql = "SELECT * FROM backpacks WHERE backpack_id = ?;";

        when(mockJdbcTemplate.queryForObject(
                eq(expectedSql),
                any(RowMapper.class),
                eq(backpackId)
        )).thenReturn(expected);

        Backpack result = dao.getBackpackByBackpackId(backpackId);

        assertNotNull(result);
        assertEquals("REI Backpack", result.getBackpackName());
        assertEquals("Colorado", result.getLocation());

        verify(mockJdbcTemplate).queryForObject(
                eq(expectedSql),
                any(RowMapper.class),
                eq(backpackId)
        );
    }


    @Test
    @DisplayName("updateBackpack successfully updates a backpack")
    void updateBackpack() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        BackpackDao dao = new BackpackDao(mockJdbcTemplate);

        Backpack backpack = new Backpack(
                4,
                "Sublime Adventures",
                "Dan",
                "Washington State",
                false
        );
        String username = "Dan";
        String expectedSql = """
            UPDATE backpacks SET backpack_name = ?, owner_username = ?, location = ?,
             private_value = ? WHERE backpack_id = ?;""";

        when(mockJdbcTemplate.update(
                eq(expectedSql),
                eq(backpack.getBackpackName()),
                eq(username),
                eq(backpack.getLocation()),
                eq(backpack.getPrivateValue()),
                eq(backpack.getBackpackId())
        )).thenReturn(1);

        Backpack result = dao.updateBackpack(backpack, username);

        assertNotNull(result);
        assertEquals(backpack, result);

        verify(mockJdbcTemplate).update(
                eq(expectedSql),
                eq(backpack.getBackpackName()),
                eq(username),
                eq(backpack.getLocation()),
                eq(backpack.getPrivateValue()),
                eq(backpack.getBackpackId())
        );
    }

    @Test
    @DisplayName("addBackpack successfully adds a backpack")
    void addBackpack() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        BackpackDao dao = new BackpackDao(mockJdbcTemplate);

        Backpack backpack = new Backpack(
                9,
                "Wonderful Views!",
                "Daniel",
                "AT Thru-hiking pack",
                false
        );
        String username = "Daniel";
        String expectedSql = """
            INSERT INTO backpacks (backpack_name, owner_username, location, private_value)
            VALUES (?, ?, ?, ?);""";

        when(mockJdbcTemplate.update(
                eq(expectedSql),
                eq(backpack.getBackpackName()),
                eq(username),
                eq(backpack.getLocation()),
                eq(backpack.getPrivateValue())
        )).thenReturn(1);

        Backpack result = dao.addBackpack(backpack, username);

        assertNotNull(result);
        assertEquals(backpack, result);

        verify(mockJdbcTemplate).update(
                eq(expectedSql),
                eq(backpack.getBackpackName()),
                eq(username),
                eq(backpack.getLocation()),
                eq(backpack.getPrivateValue())
        );

    }

    @Test
    @DisplayName("deleteBackpack successfully returns 1")
    void deleteBackpack() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        BackpackDao dao = new BackpackDao(mockJdbcTemplate);

        int backpackId = 12;
        String expectedSql = "DELETE FROM backpacks WHERE backpack_id = ?;";

        when(mockJdbcTemplate.update(
                eq(expectedSql),
                eq(backpackId)
        )).thenReturn(1); // Simulate one row deleted

        int result = dao.deleteBackpack(backpackId);

        assertEquals(1, result);

        verify(mockJdbcTemplate).update(
                eq(expectedSql),
                eq(backpackId)
        );
    }
}