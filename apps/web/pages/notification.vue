<template>
    <div>
      <NotificationChat 
        title="Системные уведомления"
        :notifications="notifications"
        :show-stats="true"
        :unread-count="unreadCount"
        @message-click="handleMessageClick"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Notification } from '~/types/notifications';
  
  const notifications = ref<Notification[]>([
    {
      id: 1,
      type: 'info',
      text: 'Добро пожаловать в центр уведомлений!',
      timestamp: new Date('2025-05-03T10:05:00'),
      priority: 'low',
      read: false,
      actionUrl: '/welcome',
      category: 'system',
      iconUrl: '/images/blue.png',
      details: {
        title: 'Руководство по началу работы',
        description: 'Добро пожаловать в центр уведомлений',
        items: [
          'Регулярно проверяйте уведомления',
          'Нажмите, чтобы отметить как прочитанное',
          'Используйте фильтры для организации уведомлений'
        ]
      }
    },
    {
      id: 2,
      type: 'success',
      text: 'Ваш профиль успешно обновлен.',
      timestamp: new Date('2024-04-03T10:00:00'),
      priority: 'medium',
      read: true,
      actionUrl: '/profile',
      category: 'profile',
      iconUrl: '/images/purpur.png',
      details: {
        title: 'Сводка обновления профиля',
        items: [
          'Информация профиля обновлена',
          'Настройки безопасности изменены',
          'Предпочтения сохранены'
        ]
      }
    },
    {
      id: 3,
      type: 'warning',
      text: 'Пожалуйста, подтвердите ваш email адрес.',
      timestamp: new Date('2024-04-03T10:10:00'),
      priority: 'high',
      read: false,
      actionUrl: '/verify-email',
      category: 'security',
      iconUrl: '/images/blue.png',
      details: {
        title: 'Требуется подтверждение email',
        description: 'Для повышения безопасности требуется подтверждение email',
        items: [
          'Проверьте вашу почту',
          'Нажмите на ссылку подтверждения',
          'Подтвердите вашу личность'
        ]
      }
    },
    {
      id: 4,
      type: 'error',
      text: 'Не удалось подключиться к серверу.',
      timestamp: new Date('2024-04-03T10:15:00'),
      priority: 'critical',
      read: false,
      actionUrl: '/status',
      category: 'system',
      iconUrl: '/images/purpur.png',
      details: {
        title: 'Ошибка подключения',
        description: 'Не удалось установить соединение с сервером',
        items: [
          'Таймаут соединения через 30 секунд',
          'Сервер не отвечает',
          'Статус сети: нестабильный'
        ]
      }
    }
  ]);
  
  const unreadCount = computed(() => {
    return notifications.value.filter(notification => !notification.read).length;
  });
  
  const handleMessageClick = (message: Notification) => {
    console.log('Сообщение нажато:', message);
    message.read = true;
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
  }
  
  * {
    box-sizing: border-box;
  }
  </style>