package org.example.controllers;

import org.example.daos.BackpackDao;
import org.example.models.Backpack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/backpacks")
@PreAuthorize("isAuthenticated()")
public class BackpackController {

    private final BackpackDao backpackDao;

    @Autowired
    public BackpackController(BackpackDao backpackDao) {
        this.backpackDao = backpackDao;
    };

    @GetMapping
    public List<Backpack> getAllBackpacks() {
        return backpackDao.getBackpacks();
    }

    @GetMapping(path="/username")
    public List<Backpack> getBackpacksByUserName(Principal principal) {
        return backpackDao.getBacksByUsername(principal.getName());
    }

    @GetMapping(path="/id/{backpackId}")
    public Backpack getBackpackByBackpackId(@PathVariable int backpackId) {
        Backpack backpack = backpackDao.getBackpackByBackpackId(backpackId);
        if (backpack == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Backpack not found");
        }
        return backpack;
    }

    @PutMapping(path="/update")
    @ResponseStatus(HttpStatus.OK)
    public Backpack updateBackpack(@RequestBody Backpack backpack, Principal principal) {
        String username = principal.getName();
        return backpackDao.updateBackpack(backpack, username);
    }

    /**
     * Needed:  A method that updates ANY backpack (if the user's role is admin):
     */

    @PostMapping(path="/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Backpack addBackpack (Principal principal, @RequestBody Backpack backpack) {
        String username = principal.getName();
        return backpackDao.addBackpack(backpack, username);
    }

    @DeleteMapping(path="/{backpackId}")
    public int deleteBackpack (@PathVariable int backpackId) {
        return backpackDao.deleteBackpack(backpackId);
    }
}
