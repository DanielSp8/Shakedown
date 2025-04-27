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


    // Change this route; needs to use the backpackId (backpack_id field) now.
    @GetMapping(path = "/gear/{trail_id}")
    public List<GearList> getGearListByTrailId(@PathVariable int trail_id) {
        return gearListDao.getGearListByTrailId(trail_id);
    }

    @GetMapping(path="/user")
    public List<GearList> getGearListByUsername(Principal principal) {
        return gearListDao.getGearListByUsername(principal.getName());
    }

    @PutMapping(path="/update")
    @ResponseStatus(HttpStatus.OK)
    public GearList updateGearItem (@RequestBody GearList gearItem) {
        return gearListDao.updateGearItem(gearItem);
    }

//    Updates a gear list per the username and checks the role logged in:
    // It's likely I'll remove this function sometime soon.  --Why add a single gear item??
    @PostMapping(path="/add")
    @ResponseStatus(HttpStatus.CREATED)
    public GearList addGearItem (Principal principal, @RequestBody GearList gearItem) {
        String username = principal.getName();
        return gearListDao.addGearItem(gearItem);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path="/batch-insert")
    public List<GearList> createGearList(Principal principal, @RequestBody List<GearList> gearItems) {
        String username = principal.getName();
        return gearListDao.batchInsertGearListItems(gearItems, username);
    }

    @DeleteMapping(path="/{itemId}")
    public int deleteGearItem (@PathVariable int itemId) {
        return gearListDao.deleteGearItem(itemId);
    }


}
