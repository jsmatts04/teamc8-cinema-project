package com.teamc8.service;

import com.teamc8.config.email.EmailSender;
import com.teamc8.exception.PromotionNotValidException;
import com.teamc8.model.Promotion;
import com.teamc8.model.User;
import com.teamc8.repository.PromotionRepository;
import com.teamc8.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;
    private final UserRepository userRepository;
    private final EmailSender promotionSenderService;

    public List<Promotion> getAllPromos() {
        return promotionRepository.findAll();
    }

    public Promotion addPromo(Promotion promotion) {
        if (promotionRepository.existsByCode(promotion.getCode()))
            throw new PromotionNotValidException(promotion.getCode());
        Promotion newPromotion = promotionRepository.save(promotion);
        sendPromotionEmail(newPromotion);
        return newPromotion;
    }

    private void sendPromotionEmail(Promotion promotion) {
        List<User> eligibleUsers = userRepository.findByPromotionEligibility(true);
        String promoCode = promotion.getPromotionCode();
        int discountAmount = promotion.getDiscountAmount();
        for (User user : eligibleUsers) {
            String emailContent = buildPromotionEmail(user.getFirstName(),promoCode, discountAmount);
            promotionSenderService.send(user.getEmail(), emailContent);
        }
    }

    public Promotion updatePromo(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    public void deletePromo(Promotion promotion) {
        promotionRepository.delete(promotion);
    }

    public Promotion getPromoById(int id) {
        return promotionRepository.findById(id).orElse(null);
    }

    public Promotion validatePromoByCode(String code) {
        Promotion promotion = promotionRepository.findByCode(code).orElseThrow(
                () -> new PromotionNotValidException(code)
        );

        if (promotion.getEndDate().isAfter(LocalDate.now().minusDays(1)) && promotion.getStartDate().isBefore(LocalDate.now().plusDays(1)))
            return promotion;
        else
            return null;
    }

    private String buildPromotionEmail(String name, String promoCode, int discountAmount) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">" +
                "<span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">" +
                "Exciting Promotion Just For You!</span>" +
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "Hi " + name + "," +
                "</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "We're thrilled to offer you an exclusive promotion! Your promo code is: " + promoCode +
                "</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "Enjoy a discount of " + discountAmount + "% on your next purchase!" +
                "</p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\">" +
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">" +
                "Enjoy your special offer and thank you for being with us!" +
                "</div>";
    }
}
