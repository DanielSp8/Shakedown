package org.example.controllers;

import org.example.daos.GearListDao;
import org.example.models.GearList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/gearlists")
@PreAuthorize("isAuthenticated()")
public class GearListController {
    @Autowired
    private GearListDao gearListDao;

    @GetMapping
    public List<GearList> getAll() {
        return gearListDao.getGearLists();
    }

    @GetMapping("/searchGear/returnAll/{orderByField}/{sortDirection}")
    public List<GearList> returnAllGearThroughSearch(@PathVariable String orderByField, @PathVariable String sortDirection) {
        return gearListDao.returnAllGearThroughSearch(orderByField, sortDirection);
    }

    @GetMapping("/searchGear/{field}/{searchByValue}/{orderByField}/{sortDirection}")
    public List<GearList> searchForGear(@PathVariable String field, @PathVariable String searchByValue, @PathVariable String orderByField, @PathVariable String sortDirection) { return gearListDao.searchForGear(field, searchByValue, orderByField, sortDirection);}

    // Search for gear via a LIKE statement
    @GetMapping("/searchGear/{columnToSearch}/like/{word}/{orderByField}/{sortDirection}")
    public List<GearList> searchThroughCategoryForWord(@PathVariable String columnToSearch, @PathVariable String word, @PathVariable String orderByField, @PathVariable String sortDirection) {
        return gearListDao.searchThroughCategoryForWord(columnToSearch, word, orderByField, sortDirection);
    }

    // For getting a single gear list item
    @GetMapping("/{gearListItem}")
    public GearList gearListItem(@PathVariable int gearListItem) {
        return gearListDao.getSingleGearItem(gearListItem);
    }

    @GetMapping("/gear/{backpackId}")
    public List<GearList> getGearListByBackpackId(@PathVariable int backpackId) {
        return gearListDao.getGearListByBackpackId(backpackId);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public GearList updateGearItem (@RequestBody GearList gearItem) {
        return gearListDao.updateGearItem(gearItem);
    }

    // For adding a single gear item...
    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public GearList createGearItem (@RequestBody GearList gearItem) {
        return gearListDao.addGearItem(gearItem);
    }

    @DeleteMapping("/{itemId}")
    public int deleteGearItem (@PathVariable int itemId) {
        return gearListDao.deleteGearItem(itemId);
    }
}
