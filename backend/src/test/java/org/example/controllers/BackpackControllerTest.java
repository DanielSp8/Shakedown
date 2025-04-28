package org.example.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.daos.BackpackDao;
import org.example.models.Backpack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BackpackController.class)
@AutoConfigureMockMvc(addFilters = false)
class BackpackControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BackpackDao backpackDao;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Order(1)
    @DisplayName("GET /api/backpacks returns list of backpacks")
    void testGetAllBackpacks() throws Exception {
        Backpack backpackOne = new Backpack(1, "Surfing Backpack", "admin", "Costa Rica", java.sql.Date.valueOf("2027-09-03"));
        Backpack backpackTwo = new Backpack(2, "Mountain Backpack", "user", "Colorado", java.sql.Date.valueOf("2025-06-20"));
        Backpack backpackThree = new Backpack(3, "Philmont", "Danielson", "New Mexico", java.sql.Date.valueOf("2028-06-19"));
        List<Backpack> backpacks = Arrays.asList(backpackOne, backpackTwo, backpackThree);

        when(backpackDao.getBackpacks()).thenReturn(backpacks);

        mockMvc.perform(get("/api/backpacks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(3))
                .andExpect(jsonPath("$[0].backpackName").value("Surfing Backpack"))
                .andExpect(jsonPath("$[1].backpackName").value("Mountain Backpack"))
                .andExpect(jsonPath("$[2].backpackName").value("Philmont"));
    }

    @Test
    @Order(2)
    @DisplayName("GET /api/backpacks/username returns a user's backpacks")
    void getBackpacksByUserName() throws Exception {
        Backpack backpackOne = new Backpack(1, "European Adventures", "Danielson", "Europe", java.sql.Date.valueOf("2027-05-12"));
        Backpack backpackTwo = new Backpack(2, "African Safari", "Danielson", "Tanzania", java.sql.Date.valueOf("2025-04-28"));
        Backpack otherUserBackpack = new Backpack(3, "Surfing Backpack", "user", "Fiji", java.sql.Date.valueOf("2026-06-22"));
        List<Backpack> theseBackpacks = Arrays.asList(backpackOne, backpackTwo);

        when(backpackDao.getBacksByUsername("Danielson")).thenReturn(theseBackpacks);

        mockMvc.perform(get("/api/backpacks/username")
                .principal(() -> "Danielson"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].backpackName").value("European Adventures"))
                .andExpect(jsonPath("$[1].location").value("Tanzania"));
    }

    @Test
    @Order(3)
    @DisplayName("GET /api/backpacks/id/{backpackId} returns specific backpack")
    void getBackpackByBackpackId() throws Exception{
        Backpack backpackOne = new Backpack(1, "European Adventures", "Danielson", "Europe", java.sql.Date.valueOf("2027-05-12"));
        Backpack backpackTwo = new Backpack(2, "African Safari", "Danielson", "Tanzania", java.sql.Date.valueOf("2025-04-28"));
        Backpack backpackThree = new Backpack(3, "Surfing Backpack", "user", "Fiji", java.sql.Date.valueOf("2026-06-22"));
        Backpack backpackFour = new Backpack(4, "Surfing Backpack", "admin", "Costa Rica", java.sql.Date.valueOf("2027-09-03"));
        Backpack backpackFive = new Backpack(5, "Mountain Backpack", "user", "Colorado", java.sql.Date.valueOf("2025-06-20"));
        Backpack backpackSix = new Backpack(6, "Philmont", "Danielson", "New Mexico", java.sql.Date.valueOf("2028-06-19"));
        List<Backpack> backpacks = Arrays.asList(backpackOne, backpackTwo, backpackThree, backpackFour, backpackFive, backpackSix);

        when(backpackDao.getBackpackByBackpackId(3)).thenReturn((backpacks.get(2)));

        mockMvc.perform(get("/api/backpacks/id/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.backpackName").value("Surfing Backpack"))
                .andExpect(jsonPath("$.ownerUsername").value("user"))
                .andExpect(jsonPath("$.location").value("Fiji"));
    }


    @Test
    @Order(4)
    @DisplayName("PUT /api/backpacks/update returns backpack object on success or null if not updated")
    void updateBackpack() throws Exception {
        Backpack updateBackpack = new Backpack(1, "Philmont 2027", "Danielson", "New Mexico", java.sql.Date.valueOf("2027-06-03"));
        
        when(backpackDao.updateBackpack(any(Backpack.class), eq("Danielson"))).thenReturn(updateBackpack);
        
        mockMvc.perform(put("/api/backpacks/update")
                .principal(() -> "Danielson")
                        .content(objectMapper.writeValueAsString(updateBackpack))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.backpackName").value("Philmont 2027"))
                .andExpect(jsonPath("$.location").value("New Mexico"))
                .andExpect(jsonPath("$.backpackId").value(1));
    }

    @Test
    @Order(5)
    @DisplayName("CREATE /api/backpacks/add returns the backpack entered")
    void addBackpack() throws Exception {
        Backpack createdBackpack = new Backpack("Philmont 2026", "Daniel", "New Mexico", java.sql.Date.valueOf("2026-05-01"));

        when(backpackDao.addBackpack(any(Backpack.class), eq("Daniel"))).thenReturn(createdBackpack);

        mockMvc.perform(post("/api/backpacks/add")
                .principal(() -> "Daniel")
                .content(objectMapper.writeValueAsString(createdBackpack))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.backpackName").value("Philmont 2026"))
                .andExpect(jsonPath("$.ownerUsername").value("Daniel"))
                .andExpect(jsonPath("$.location").value("New Mexico"));

    }

    @Test
    @Order(6)
    @DisplayName("DELETE /api/backpacks/{backpackId}/ returns 1 for success")
    void deleteBackpack() throws Exception {
        int backpackId = 1;

        when(backpackDao.deleteBackpack(backpackId)).thenReturn(1);

        mockMvc.perform(delete("/api/backpacks/{backpackId}", backpackId))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }
}