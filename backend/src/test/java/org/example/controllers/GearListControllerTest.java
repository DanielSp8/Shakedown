package org.example.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.daos.GearListDao;
import org.example.models.GearList;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GearListController.class)
@AutoConfigureMockMvc(addFilters = false)
class GearListControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GearListDao gearListDao;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    @Order(1)
    @DisplayName("GET /api/gearlists return all gear lists' info")
    void getAll() throws Exception {
        GearList gearListOne = new GearList("Hennesy Hammock", "Shelter", "A mix of a tent and hammock", 1, new BigDecimal(".5"), new BigDecimal("0"), false,"Danielson", true, 1);
        GearList gearListTwo = new GearList("Sandals", "Footwear", "Great for comfort at the campsite!", 1, new BigDecimal("10"), new BigDecimal("0"), false,"Danielson", true, 1);
        GearList gearListThree = new GearList("Toothbrush", "Hygiene", "Optionally cut in half to save space and weight!", 0, new BigDecimal(".5"), new BigDecimal("1"), false,"Danielson", true, 1);
        GearList gearListFour = new GearList("Toothpaste", "Hygiene", "Freshen up!", 0, new BigDecimal(".2"), new BigDecimal("0"), false,"Danielson", true, 1);
        GearList gearListFive = new GearList("Hand Sanitizer", "Hygiene", "Nice to have, while backpacking.", 0, new BigDecimal(".2"), new BigDecimal("1.99"), false,"Danielson", true, 1);
        GearList gearListSix = new GearList("Nalgene 1 Quart Water Bottle", "Water", "Crucial for staying hydrated!", 2, new BigDecimal("4"), new BigDecimal("0"), false,"Danielson", true, 1);
        GearList gearListSeven = new GearList("Ultralight/Watertight .3 Medical Kit", "Emergencies", "Ideal for backpacking", 0, new BigDecimal("2.6"), new BigDecimal("10.95"), false,"Danielson", true, 2);
        List<GearList> gearLists = Arrays.asList(gearListOne, gearListTwo, gearListThree, gearListFour, gearListFive, gearListSix, gearListSeven);

        when(gearListDao.getGearLists()).thenReturn(gearLists);

        mockMvc.perform(get("/api/gearlists"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(7))
                .andExpect(jsonPath("$[0].category").value("Shelter"))
                .andExpect(jsonPath("$[1].itemName").value("Sandals"))
                .andExpect(jsonPath("$[2].itemName").value("Toothbrush"))
                .andExpect(jsonPath("$[6].category").value("Emergencies"))
                .andExpect(jsonPath("$[0].backpackId").value("1"))
                .andExpect(jsonPath("$[6].backpackId").value("2"));
    }

    @Test
    @Order(2)
    @DisplayName("GET /api/gearlists/gear/{backpackId}")
    void getGearBackpackId() throws Exception{
        int backpackId = 1;
        List<GearList> mockGearList = List.of(
             new GearList("Hennesy Hammock", "Shelter", "A mix of a tent and hammock", 1, new BigDecimal(".5"), new BigDecimal("0"), false,"Danielson", false, 1),
             new GearList("Sandals", "Footwear", "Great for comfort at the campsite!", 1, new BigDecimal("10"), new BigDecimal("0"), false,"Danielson", false, 1)
        );

        when(gearListDao.getGearListByBackpackId(backpackId)).thenReturn(mockGearList);

        mockMvc.perform(get("/api/gearlists/gear/{backpackId}", backpackId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value("2"))
                .andExpect(jsonPath("$[1].category").value("Footwear"));
    }

    @Test
    @Order(3)
    @DisplayName("PUT /api/gearlists/update returns updated gear item")
    void updateGearItem() throws Exception {
        GearList gearListItem = new GearList(1,"Nalgene 1 Quart Water Bottle", "Water", "Crucial for staying hydrated!", 2, new BigDecimal("4"), new BigDecimal("0"), false,"Danielson", true,1);

        when(gearListDao.updateGearItem(any(GearList.class))).thenReturn(gearListItem);

        mockMvc.perform(put("/api/gearlists/update")
                .content(objectMapper.writeValueAsString(gearListItem))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.category").value("Water"))
                .andExpect(jsonPath("$.backpackId").value("1"));
    }

    @Test
    @Order(4)
    @DisplayName("CREATE /api/gearlists/add/")
    void createGearList() throws Exception {
        GearList gearListItem = new GearList("Small Trowel", "Hygiene", "Dig a hole for deuce dropping!", 0, new BigDecimal("8"), new BigDecimal("0"), false,"Danielson", true, 1);

        when(gearListDao.addGearItem(any(GearList.class))).thenReturn(gearListItem);

        mockMvc.perform(post("/api/gearlists/add")
                .content(objectMapper.writeValueAsString(gearListItem))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.itemName").value("Small Trowel"))
                .andExpect(jsonPath("$.category").value("Hygiene"));
    }

    @Test
    @Order(5)
    @DisplayName("DELETE /api/gearlists/{itemId} returns 1 for success")
    void deleteGearItem() throws Exception {
        int itemId = 1;

        when(gearListDao.deleteGearItem(itemId)).thenReturn(1);

        mockMvc.perform(delete("/api/gearlists/{itemId}", itemId))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }
}