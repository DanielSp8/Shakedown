package org.example.daos;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.example.models.GearList;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.ArgumentMatchers;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.jdbc.core.RowMapper;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GearListDaoTest {

    @Test
    @DisplayName("getGearLists returns expected list")
    void getGearLists() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList expected = new GearList(
                1,
                "Tent",
                "Shelter",
                "A great tent!  I love it!",
                1,
                new BigDecimal("15.00"),
                new BigDecimal("399.95"),
                false,
                "Danielson",
                true,
                1);

        when(mockJdbcTemplate.query(
                eq("SELECT * FROM gear_lists ORDER BY item_id;"),
                any(RowMapper.class)
        )).thenReturn(List.of(expected));

        List<GearList> result = dao.getGearLists();

        assertEquals(1, result.size());
        assertEquals("Tent", result.get(0).getItemName());
        assertEquals("Shelter", result.get(0).getCategory());
        assertEquals("A great tent!  I love it!", result.get(0).getDescription());
        assertEquals("Danielson", result.get(0).getOwnerUsername());

        verify(mockJdbcTemplate, times(1)).query(eq("SELECT * FROM gear_lists ORDER BY item_id;"),
                any(RowMapper.class));
    }

    @Test
    @DisplayName("searchForGear valid input returns an expected list")
    void searchForGear() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList expected = new GearList(
                1,
                "Tent",
                "Shelter",
                "A great tent!  I love it!",
                1,
                new BigDecimal("15.00"),
                new BigDecimal("399.95"),
                false,
                "Danielson",
                true,
                1);

        String field = "category";
        String searchByValue = "Shelter";
        String orderByField = "item_id";
        String sortDirection = "ASC";
        String expectedSql = "SELECT * FROM gear_lists WHERE category = ? ORDER BY item_id ASC";

        when(mockJdbcTemplate.query(eq(expectedSql),
                any(RowMapper.class),
                eq(searchByValue)
        )).thenReturn(List.of(expected));

        List<GearList> result = dao.searchForGear(field, searchByValue, orderByField, sortDirection);

        assertEquals(1, result.size());
        assertEquals("Tent", result.get(0).getItemName());
        assertEquals("Danielson", result.get(0).getOwnerUsername());

        verify(mockJdbcTemplate, times(1)).query(
                eq(expectedSql),
                any(RowMapper.class),
                eq(searchByValue)
        );
    }

    @Test
    @DisplayName("searchThroughCategoryForWord returns expected list")
    void searchThroughCategoryForWord() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList expected = new GearList(
                1,
                "Tent",
                "Shelter",
                "A great tent!  I love it!",
                1,
                new BigDecimal("15.00"),
                new BigDecimal("399.95"),
                false,
                "Danielson",
                true,
                1);

        String columnToSearch = "category";
        String word = "Shelter";
        String orderByField = "item_name";
        String sortDirection = "ASC";

        String expectedSql = "SELECT * FROM gear_lists WHERE category LIKE ? ORDER BY item_name ASC";
        String expectedParam = "%Shelter%";

        when(mockJdbcTemplate.query(eq(expectedSql),
                any(RowMapper.class),
                eq(expectedParam)
        )).thenReturn(List.of(expected));

        List<GearList> result = dao.searchThroughCategoryForWord(columnToSearch, word, orderByField, sortDirection);

        assertEquals(1, result.size());
        assertEquals("Tent", result.get(0).getItemName());
        assertEquals("Danielson", result.get(0).getOwnerUsername());

        verify(mockJdbcTemplate, times(1)).query(
                eq(expectedSql),
                any(RowMapper.class),
                eq(expectedParam)
        );
    }

    @Test
    @DisplayName("returnsAllGearThroughSearch returns expected list")
    void returnAllGearThroughSearch() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList expected = new GearList(
                1,
                "Tent",
                "Shelter",
                "A great tent!  I love it!",
                1,
                new BigDecimal("15.00"),
                new BigDecimal("399.95"),
                false,
                "Danielson",
                true,
                1);

        String orderByField = "item_name";
        String sortDirection = "ASC";
        String expectedSql = "SELECT * FROM gear_lists ORDER BY item_name ASC";

        when(mockJdbcTemplate.query(
                eq(expectedSql),
                any(RowMapper.class)
                )).thenReturn(List.of(expected));

        List<GearList> result = dao.returnAllGearThroughSearch(orderByField, sortDirection);

        assertEquals(1, result.size());
        assertEquals("Tent", result.get(0).getItemName());
        assertEquals("Danielson", result.get(0).getOwnerUsername());

        verify(mockJdbcTemplate, times(1)).query(
                eq(expectedSql),
                any(RowMapper.class));
    }

    @Test
    @DisplayName("getGearListByBackpackId returns the expected list")
    void getGearListByBackpackId() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList expected = new GearList(
                1,
                "Tent",
                "Shelter",
                "desc",
                1,
                new BigDecimal("15.00"),
                new BigDecimal("279.96"),
                false,
                "Daniel",
                true,
                7
        );

        String expectedSql = "SELECT * FROM gear_lists WHERE backpack_id = ?;";

        when(mockJdbcTemplate.query(
                eq(expectedSql),
                any(RowMapper.class),
                eq(7)
        )).thenReturn(List.of(expected));

        List<GearList> result = dao.getGearListByBackpackId(7);

        assertEquals(1, result.size());
        assertEquals("Tent", result.get(0).getItemName());
        assertEquals(7, result.get(0).getBackpackId());

        verify(mockJdbcTemplate, times(1)).query(
                eq(expectedSql),
                any(RowMapper.class),
                eq(7)
        );
    }

    @Test
    @DisplayName("getSingleGearItem returns the expected item")
    void getSingleGearItem() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList expected = new GearList(
                101,
                "Sleeping Bag",
                "Sleep",
                "Warm and comfy",
                2,
                new BigDecimal("32.00"),
                new BigDecimal("119.99"),
                false,
                "Daniel",
                false,
                5
        );

        String expectedSql = "SELECT * FROM gear_lists WHERE item_id = ?;";

        when(mockJdbcTemplate.queryForObject(
                eq(expectedSql),
                any(org.springframework.jdbc.core.RowMapper.class),
                eq(101)
        )).thenReturn(expected);

        GearList result = dao.getSingleGearItem(101);

        assertNotNull(result);
        assertEquals("Sleeping Bag", result.getItemName());
        assertEquals(101, result.getItemId());
        assertEquals("Sleep", result.getCategory());

        verify(mockJdbcTemplate, times(1)).queryForObject(
                eq(expectedSql),
                any(RowMapper.class),
                eq(101)
        );
    }

    @Test
    @DisplayName("getGearListByCategory returns the expected item")
    void getGearListByCategory() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList expected = new GearList(
                1,
                "Tent",
                "Shelter",
                "desc",
                1,
                new BigDecimal("15.00"),
                new BigDecimal("279.96"),
                false,
                "Daniel",
                true,
                1
        );

        String category = "Shelter";
        String expectedSql = "SELECT * FROM gear_lists WHERE category = ?;";

        when(mockJdbcTemplate.query(
                eq(expectedSql),
                any(RowMapper.class),
                eq(category)
        )).thenReturn(List.of(expected));

        List<GearList> result = dao.getGearListByCategory(category);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Tent", result.get(0).getItemName());
        verify(mockJdbcTemplate).query(
                eq(expectedSql),
                any(RowMapper.class),
                eq(category)
        );
    }

    @Test
    @DisplayName("updateGearItem updates successfully")
    void updateGearItem() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList gearItem = new GearList(
                2, // itemId
                "Rain Jacket",
                "Clothing",
                "Waterproof shell",
                1,
                new BigDecimal("8.00"),
                new BigDecimal("99.99"),
                false,
                "Daniel",
                false,
                4
        );

        String expectedSql = """
            UPDATE gear_lists SET item_name = ?, category = ?, description = ?, weight_lbs = ?, weight_oz = ?, price = ?, backpack_id = ?,\s
            private_value = ?, need_to_purchase = ?, owner_username = ? WHERE item_id = ?;""";

        when(mockJdbcTemplate.update(
                eq(expectedSql),
                eq(gearItem.getItemName()),
                eq(gearItem.getCategory()),
                eq(gearItem.getDescription()),
                eq(gearItem.getWeightLbs()),
                eq(gearItem.getWeightOz()),
                eq(gearItem.getPrice()),
                eq(gearItem.getBackpackId()),
                eq(gearItem.getPrivateValue()),
                eq(gearItem.getNeedToPurchase()),
                eq(gearItem.getOwnerUsername()),
                eq(gearItem.getItemId())
        )).thenReturn(1);

        GearList result = dao.updateGearItem(gearItem);

        assertNotNull(result);
        assertEquals(gearItem, result);

        verify(mockJdbcTemplate).update(
                eq(expectedSql),
                eq(gearItem.getItemName()),
                eq(gearItem.getCategory()),
                eq(gearItem.getDescription()),
                eq(gearItem.getWeightLbs()),
                eq(gearItem.getWeightOz()),
                eq(gearItem.getPrice()),
                eq(gearItem.getBackpackId()),
                eq(gearItem.getPrivateValue()),
                eq(gearItem.getNeedToPurchase()),
                eq(gearItem.getOwnerUsername()),
                eq(gearItem.getItemId())
        );
    }

    @Test
    @DisplayName("addGearItem adds a gear item successfully")
    void addGearItem() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        GearList gearItem = new GearList(
                5,
                "Hiking Socks",
                "Clothing",
                "Warm wool socks",
                0,
                new BigDecimal("2.00"),
                new BigDecimal("12.99"),
                false,
                "Daniel",
                true,
                1
        );

        String expectedSql = "INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, private_value, owner_username, need_to_purchase, backpack_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        when(mockJdbcTemplate.update(
                eq(expectedSql),
                eq(gearItem.getItemName()),
                eq(gearItem.getCategory()),
                eq(gearItem.getDescription()),
                eq(gearItem.getWeightLbs()),
                eq(gearItem.getWeightOz()),
                eq(gearItem.getPrice()),
                eq(gearItem.getPrivateValue()),
                eq(gearItem.getOwnerUsername()),
                eq(gearItem.getNeedToPurchase()),
                eq(gearItem.getBackpackId())
        )).thenReturn(1);

        GearList result = dao.addGearItem(gearItem);

        assertNotNull(result);
        assertEquals(gearItem, result);

        verify(mockJdbcTemplate).update(
                eq(expectedSql),
                eq(gearItem.getItemName()),
                eq(gearItem.getCategory()),
                eq(gearItem.getDescription()),
                eq(gearItem.getWeightLbs()),
                eq(gearItem.getWeightOz()),
                eq(gearItem.getPrice()),
                eq(gearItem.getPrivateValue()),
                eq(gearItem.getOwnerUsername()),
                eq(gearItem.getNeedToPurchase()),
                eq(gearItem.getBackpackId())
        );
    }

    @Test
    @DisplayName("deleteGearItem returns 1 if successful deletion")
    void deleteGearItem() {
        JdbcTemplate mockJdbcTemplate = mock(JdbcTemplate.class);
        GearListDao dao = new GearListDao(mockJdbcTemplate);

        int itemId = 7;
        String expectedSql = "DELETE FROM gear_lists WHERE item_id = ?;";

        when(mockJdbcTemplate.update(
                eq(expectedSql),
                eq(itemId)
        )).thenReturn(1);

        int result = dao.deleteGearItem(itemId);

        assertEquals(1, result);

        verify(mockJdbcTemplate).update(
                eq(expectedSql),
                eq(itemId)
        );
    }
}