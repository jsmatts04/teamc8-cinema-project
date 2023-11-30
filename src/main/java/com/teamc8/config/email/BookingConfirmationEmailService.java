package com.teamc8.config.email;

import com.teamc8.config.email.EmailSender;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookingConfirmationEmailService implements EmailSender {

    private final static Logger LOGGER = LoggerFactory.getLogger(BookingConfirmationEmailService.class);
    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to, String emailContent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setText(emailContent, true);
            helper.setTo(to);
            helper.setSubject("Your Movie Ticket Booking Confirmation"); // Updated subject line
            helper.setFrom("cinemaebooking0@gmail.com"); // Customize if needed

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error("Failed to send booking confirmation email", e);
            throw new IllegalStateException("Failed to send booking confirmation email");
        }
    }
}

