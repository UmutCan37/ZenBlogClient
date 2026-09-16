import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from '../../_services/message-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { MessageDto } from '../../_models/message';
import { Modal } from 'bootstrap';
declare const alertify: any;

@Component({
  selector: 'admin-message',
  standalone: false,
  templateUrl: './message.html',
  styleUrl: './message.css'
})
export class Message {

  constructor(
    private messageService: MessageService,
    private swal: SweetalertService,
    private cdr: ChangeDetectorRef
  ) {
    this.getMessages();
  }

  messages: MessageDto[] = [];
  filter: 'all' | 'unread' | 'read' = 'all';
  selectedMessage: MessageDto | null = null;

  getMessages() {
    this.messageService.getMessages().subscribe({
      next: result => {
        this.messages = result.data;
        this.cdr.detectChanges();
      },
      error: result => console.log('getMessages hata:', result)
    });
  }

  setFilter(filter: 'all' | 'unread' | 'read') {
    this.filter = filter;

    if (filter === 'all') {
      this.getMessages();
    } else if (filter === 'unread') {
      this.messageService.getUnread().subscribe({
        next: result => {
          this.messages = result.data;
          this.cdr.detectChanges();
        },
        error: result => console.log('getUnread hata:', result)
      });
    } else {
      this.messageService.getRead().subscribe({
        next: result => {
          this.messages = result.data;
          this.cdr.detectChanges();
        },
        error: result => console.log('getRead hata:', result)
      });
    }
  }

  viewMessage(message: MessageDto) {
    this.selectedMessage = message;

    if (!message.isRead) {
      this.messageService.markAsRead(message).subscribe({
        complete: () => {
          message.isRead = true;
          this.cdr.detectChanges();
        },
        error: result => console.log('markAsRead hata:', result)
      });
    }
  }

  async delete(id: string) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.messageService.delete(id).subscribe({
        error: result => {
          console.error(result.error);
          alertify.error("An Error Occured!");
        },
        complete: () => {
          alertify.success("Message Deleted!");
          this.setFilter(this.filter);
        }
      });
    }
  }
}
