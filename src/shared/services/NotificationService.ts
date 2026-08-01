type NotificationTimer = ReturnType<typeof setTimeout>;

class NotificationService {
  private timers: Map<string, NotificationTimer> = new Map();

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    return Notification.requestPermission();
  }

  schedule(taskId: string, title: string, date: Date): void {
    this.cancel(taskId);

    const now = new Date();
    const delay = date.getTime() - now.getTime();

    if (delay <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      this.sendNotification(title);
      this.timers.delete(taskId);
    }, delay);

    this.timers.set(taskId, timer);
  }

  cancel(taskId: string): void {
    const timer = this.timers.get(taskId);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(taskId);
    }
  }

  cancelAll(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

  private sendNotification(title: string): void {
    if (Notification.permission !== 'granted') {
      return;
    }

    new Notification(title, {
      body: `Sua tarefa está agendada para agora.`,
    });
  }
}

export const notificationService = new NotificationService();
