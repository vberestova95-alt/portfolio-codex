export const profile = {
  name: 'Владислава Берестова',
  roleDescription:
    'Продуктовый дизайнер c опытом работы 6+ лет. Работаю в B2C над приложениями и веб-сервисами, имею опыт работы в B2B с системами для автоматизации бизнеса (BMS, CRM, личные кабинеты), интерфейсами для мобильных приложений в области умных домов и зданий',
  photo: {
    src: 'https://www.figma.com/api/mcp/asset/ef1334f6-a71c-4393-b79d-1719644301e7',
    alt: 'Портрет Владиславы Берестовой',
  },
  contacts: [
    { label: 'Dribbble', href: 'https://dribbble.com' },
    { label: 'Телеграм', href: 'https://t.me' },
    { label: 'CV', href: '#experience' },
  ],
};

export const cases = [
  {
    id: 'betboom-pass',
    title: 'BetBoom PASS',
    descriptionLines: [
      'Проектирование новой механики заданий в раздел геймификации',
      'и редизайн страницы заданий',
    ],
    achievements: ['Увеличение MAU на 40%', 'Retention 70%'],
    theme: 'dark',
    variant: 'featured',
    image: {
      src: 'https://www.figma.com/api/mcp/asset/b05ac6b2-40aa-4b1f-9e9a-5487f273e0f3',
      alt: 'Интерфейс кейса BetBoom PASS',
    },
    mobileImage: {
      src: 'https://www.figma.com/api/mcp/asset/aaaa3b9f-b437-483a-b2c6-895c25af27ad',
      alt: 'Мобильная версия кейса BetBoom PASS',
    },
    backdrop: 'https://www.figma.com/api/mcp/asset/a6f72e91-9cd9-4243-b452-88f6ae5c1fac',
    href: '#',
  },
  {
    id: 'yandex-news',
    title: 'Яндекс новости (Турция)',
    description:
      'Тестирование MVP версии нового раздела новостей для аудитории Турции',
    theme: 'light',
    variant: 'wide',
    image: {
      src: 'https://www.figma.com/api/mcp/asset/4a501b3b-35e2-4010-b5c6-64c3b30c9261',
      alt: 'Экраны новостного продукта для аудитории Турции',
    },
    mobileImage: {
      src: 'https://www.figma.com/api/mcp/asset/5322f178-876b-4ff8-b31a-59a8d1a883d7',
      alt: 'Мобильная версия кейса Яндекс Новости',
    },
    href: '#',
  },
  {
    id: 'kokoc-group',
    title: 'Kokoc Group',
    description: 'Редизайн сайта Kokoc Group\nк юбилею компании',
    theme: 'light',
    variant: 'kokoc',
    image: {
      src: 'https://www.figma.com/api/mcp/asset/6ab2912e-0bfc-4d40-8b78-65e9edf5b135',
      alt: 'Главный экран кейса Kokoc Group',
    },
    mobileImage: {
      src: 'https://www.figma.com/api/mcp/asset/270e1197-9f42-4ee8-9473-393b3c40cd87',
      alt: 'Мобильная версия кейса Kokoc Group',
    },
    secondaryImage: {
      src: 'https://www.figma.com/api/mcp/asset/1ec434e4-e325-47ae-8df5-88590cad7544',
      alt: 'Мобильный экран кейса Kokoc Group',
    },
    href: '#',
  },
  {
    id: 'iquoto',
    title: 'IQuoto',
    description:
      'Улучшение процесса регистрации онлайн брокера и повышение конверсии в регистрацию в 2 раза',
    theme: 'light',
    variant: 'iquoto',
    image: {
      src: 'https://www.figma.com/api/mcp/asset/788e9eff-d7fc-436d-8f60-42163c1475f5',
      alt: 'Интерфейс кейса IQuoto',
    },
    mobileImage: {
      src: 'https://www.figma.com/api/mcp/asset/f8b864cd-527a-4c99-8c6f-966747d64cf4',
      alt: 'Мобильная версия кейса IQuoto',
    },
    href: '#',
  },
];

export const experiences = [
  {
    id: 'betboom',
    period: 'Апрель 2025 — Настоящее время',
    company: 'BetBoom',
  },
  {
    id: 'agency-group',
    period: 'Май 2022 — март 2025',
    company: 'Ronas IT, Doubletapp, Луч, Revvy',
  },
  {
    id: 'ujin',
    period: 'Январь 2021 — Март 2022',
    company: 'Ujin (Юникорн)',
  },
  {
    id: 'helphub',
    period: 'Май 2020 — Январь 2021',
    company: 'HelpHub',
  },
];
