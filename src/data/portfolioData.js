import betboomBackdrop from '../assets/cases/betboom-backdrop.png';
import betboomFeaturedDesktop from '../assets/cases/betboom-featured-desktop.png';
import betboomFeaturedMobile from '../assets/cases/betboom-featured-mobile.png';
import iquotoDesktop from '../assets/cases/iquoto-desktop.png';
import iquotoMobile from '../assets/cases/iquoto-mobile.png';
import kokocMainDesktop from '../assets/cases/kokoc-main-desktop.png';
import kokocMainMobile from '../assets/cases/kokoc-main-mobile.png';
import kokocSideDesktop from '../assets/cases/kokoc-side-desktop.png';
import profilePhoto from '../assets/profile-photo.jpg';
import yandexNewsDesktop from '../assets/cases/yandex-news-desktop.png';
import yandexNewsMobile from '../assets/cases/yandex-news-mobile.png';

export const profile = {
  name: 'Владислава Берестова',
  roleDescription:
    'Продуктовый дизайнер c опытом работы 6+ лет. Работаю в B2C над приложениями и веб-сервисами, имею опыт работы в B2B с системами для автоматизации бизнеса (BMS, CRM, личные кабинеты), интерфейсами для мобильных приложений в области умных домов и зданий',
  photo: {
    src: profilePhoto,
    alt: 'Портрет Владиславы Берестовой',
  },
  contacts: [
    { label: 'Dribbble', href: 'https://dribbble.com/Meoosh' },
    { label: 'Телеграм', href: 'https://t.me/vberestova12' },
    { label: 'CV', href: 'https://drive.google.com/file/d/1FrDWLxnVOMbm59KtxOH8Hcq17MbjjVUW/view?usp=drive_link' },
  ],
};

export const cases = [
  {
    id: 'betboom-pass',
    title: 'BetBoom\xa0PASS',
    descriptionLines: [
      'Проектирование новой механики заданий в\xa0раздел геймификации',
      'и редизайн страницы\xa0заданий',
    ],
    achievements: ['Увеличение DAU на\xa060%', 'Retention\xa075%'],
    theme: 'dark',
    variant: 'featured',
    image: {
      src: betboomFeaturedDesktop,
      alt: 'Интерфейс кейса BetBoom PASS',
    },
    mobileImage: {
      src: betboomFeaturedMobile,
      alt: 'Мобильная версия кейса BetBoom PASS',
    },
    backdrop: betboomBackdrop,
    href: '/betboom-pass',
  },
  {
    id: 'yandex-news',
    title: 'Яндекс новости (Турция)',
    description:
      'Тестирование концепции нового раздела новостей для\xa0аудитории Турции',
    theme: 'light',
    variant: 'wide',
    image: {
      src: yandexNewsDesktop,
      alt: 'Экраны новостного продукта для аудитории Турции',
    },
    mobileImage: {
      src: yandexNewsMobile,
      alt: 'Мобильная версия кейса Яндекс Новости',
    },
    href: '/yandex-turkey',
  },
  {
    id: 'kokoc-group',
    title: 'Kokoc Group',
    description: 'Редизайн сайта Kokoc Group\nк юбилею компании',
    theme: 'light',
    variant: 'kokoc',
    image: {
      src: kokocMainDesktop,
      alt: 'Главный экран кейса Kokoc Group',
    },
    mobileImage: {
      src: kokocMainMobile,
      alt: 'Мобильная версия кейса Kokoc Group',
    },
    secondaryImage: {
      src: kokocSideDesktop,
      alt: 'Мобильный экран кейса Kokoc Group',
    },
    href: '/kokoc-group',
  },
  {
    id: 'iquoto',
    title: 'IQuoto',
    description:
      'Улучшение процесса регистрации онлайн брокера и повышение конверсии в регистрацию',
    theme: 'light',
    variant: 'iquoto',
    image: {
      src: iquotoDesktop,
      alt: 'Интерфейс кейса IQuoto',
    },
    mobileImage: {
      src: iquotoMobile,
      alt: 'Мобильная версия кейса IQuoto',
    },
    href: '/iquoto',
  },
];

export const experiences = [
  {
    id: 'betboom',
    period: 'Апрель 2025 — Настоящее время',
    company: 'BetBoom',
    description: 'Работаю над BB PASS — системой геймификации внутри основного продукта компании. Пользователи выполняют задания и получают внутреннюю валюту, которую можно обменять на скины для киберспортивных игр, мерч и другие призы. За время работы увеличила DAU на 60% за счёт А/Б-тестов карточек заданий, запустила реферальную программу, привлёкшую 3 000 новых пользователей, и ускорила передачу макетов в разработку в 2 раза.',
  },
  {
    id: 'agency-group',
    period: 'Май 2022 — Март 2025',
    company: 'Ronas IT, Doubletapp, Луч, Revvy',
    description: 'В рамках агентского сотрудничества работала с такими компаниями, как Яндекс, Avito и Kokoc group. Проводила качественные и количественные исследования в сферах логистики, ортодонтии и hr-tech, вела продуктовые проекты от исследования до передачи в разработку. В рамках проектной работы создала новый раздел новостей Яндекса для турецкой аудитории — сейчас это направление поддерживается внутренней продуктовой командой.',
  },
  {
    id: 'ujin',
    period: 'Январь 2021 — Март 2022',
    company: 'Ujin (Юникорн)',
    description: 'Проектировала интерфейсы для систем управления умным домом и зданиями — мобильные white-label приложения и личные кабинеты. Инициировала и запустила переход продукта Ujin Service на новую дизайн-систему, что сократило затраты на разработку новых функций на 15%. Разработала интерфейс умного устройства Ujin Key для дистанционного управления доступом.',
  },
  {
    id: 'helphub',
    period: 'Май 2020 — Январь 2021',
    company: 'HelpHub',
    description: 'Мобильное приложение для автоматизации сбора и выполнения заявок волонтёрскими фондами. Спроектировала мобильное приложение и участвовала во всех этапах разработки, проводила пользовательские интервью и юзабилити-тестирование MVP — по результатам нашли проблемы и добавили новые функции в продукт.',
  },
];
