package com.teamc8.model.dto;

import com.teamc8.model.PaymentCard;
import com.teamc8.model.projection.AddressProjection;
import com.teamc8.model.projection.PaymentCardProjection;
import com.teamc8.model.projection.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class AllUserInfoDTO {

    private UserInfo user;
    private List<PaymentCardProjection> paymentCards;
    private AddressProjection address;

}
