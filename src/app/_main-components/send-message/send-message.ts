import { Component } from '@angular/core';
import { MessageService } from '../../_services/message-service';
import { MessageDto } from '../../_models/message';
declare const alertify: any;

@Component({
  selector: 'send-message',
  standalone: false,
  templateUrl: './send-message.html',
  styleUrl: './send-message.css'
})
export class SendMessage {

  constructor(private messageService: MessageService) { }

  newMessage: any = {};
  submitting = false;

  sendMessage() {
    this.submitting = true;
    this.messageService.create(this.newMessage).subscribe({
      error: () => {
        this.submitting = false;
        alertify.error("Message Send Failed!");
      },
      complete: () => {
        this.submitting = false;
        alertify.success("Message has been sent!");
        this.newMessage = {};
      }
    });
  }
}
