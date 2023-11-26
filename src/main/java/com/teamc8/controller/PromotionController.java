package com.teamc8.controller;

import com.teamc8.model.Promotion;
import com.teamc8.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/promotion")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @GetMapping
    public List<Promotion> getAllPromos() {
        return promotionService.getAllPromos();
    }

    @PostMapping(path = "/add")
    public Promotion addPromo(@RequestBody Promotion promotion) {
        return promotionService.addPromo(promotion);
    }

    @PutMapping(path= "/update")
    public Promotion updatePromo(@RequestBody Promotion promotion) {
        return promotionService.updatePromo(promotion);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deletePromo(@PathVariable int id) {
        promotionService.deletePromo(promotionService.getPromoById(id));
    }

    @GetMapping(path = "/get/{id}")
    public Promotion getPromoById(@PathVariable int id) {
        return promotionService.getPromoById(id);
    }

}
