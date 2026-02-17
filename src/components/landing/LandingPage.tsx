import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Layout from './Layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'

const SECTION_COUNT = 9

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.round(scrollPosition / windowHeight)
        setActiveSection(newActiveSection)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      })
    }
  }

  const sectionLabels = [
    'Главная',
    'Цифры',
    'Каталог',
    'О нас',
    'Услуги',
    'Объекты',
    'Отзывы',
    'Расчёт',
    'Контакты',
  ]

  return (
    <Layout>
      {/* Navigation dots */}
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-3 md:p-4">
        {Array.from({ length: SECTION_COUNT }).map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full my-1.5 md:my-2 transition-all duration-300 ${
              index === activeSection
                ? 'bg-[var(--vis-navy)] scale-150'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            onClick={() => handleNavClick(index)}
            title={sectionLabels[index]}
          />
        ))}
      </nav>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--vis-orange)] origin-left z-30"
        style={{ scaleX }}
      />

      {/* Scrollable sections container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {/* ============ SECTION 1: HERO ============ */}
        <section className="h-screen snap-start relative flex items-center overflow-hidden bg-gradient-to-br from-[#1E3A5F] via-[#1a3355] to-[#0f2340]">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--vis-orange)] opacity-5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8">
            <motion.div
              initial="hidden"
              animate={activeSection === 0 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0}
            >
              <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/15 mb-6 text-sm px-4 py-1.5">
                С 2003 года на рынке
              </Badge>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-4xl"
              initial="hidden"
              animate={activeSection === 0 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0.1}
            >
              Хризотилцементные трубы во Владивостоке и Приморском крае
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mt-6"
              initial="hidden"
              animate={activeSection === 0 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0.2}
            >
              Поставляем хризотилцементные трубы и шифер, и прочие строительные
              материалы с 2003 года. Собственный склад и доставка по Приморскому краю.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial="hidden"
              animate={activeSection === 0 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0.35}
            >
              <Button
                size="lg"
                className="bg-[var(--vis-orange)] hover:bg-[var(--vis-orange-hover)] text-white font-semibold px-8 py-6 text-base"
                onClick={() => handleNavClick(7)}
              >
                Получить расчёт
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-base bg-transparent"
                onClick={() => handleNavClick(2)}
              >
                Смотреть каталог
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 2: TRUST / STATS ============ */}
        <section className="h-screen snap-start flex items-center bg-white">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
              initial="hidden"
              animate={activeSection === 1 ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              {[
                { number: '23+', label: 'Лет на рынке стройматериалов' },
                { number: '2000+', label: 'Объектов снабжено' },
                { number: '5000 м\u00B2', label: 'Площадь склада' },
                { number: '<24 ч', label: 'От заявки до отгрузки' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[var(--vis-orange)] mb-3">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-[var(--vis-dark)] leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 3: CATEGORIES ============ */}
        <section className="h-screen snap-start flex items-center bg-[var(--vis-light)]">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--vis-navy)] mb-10 md:mb-14 text-center"
              initial="hidden"
              animate={activeSection === 2 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0}
            >
              Категории товаров
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              initial="hidden"
              animate={activeSection === 2 ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              {[
                {
                  icon: 'Package',
                  title: 'Трубы асбестоцементные',
                  desc: 'Напорные, безнапорные, муфты',
                },
                {
                  icon: 'LayoutGrid',
                  title: 'Шифер',
                  desc: 'Плоский и волновой',
                },
                {
                  icon: 'Palette',
                  title: 'Волнаколор',
                  desc: 'Шоколад, красный, синий, оранжевый',
                },
              ].map((cat, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--vis-orange)]/10 flex items-center justify-center mx-auto mb-5">
                    <Icon name={cat.icon} size={28} className="text-[var(--vis-orange)]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[var(--vis-navy)] mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500">{cat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 4: WHY VIS ============ */}
        <section className="h-screen snap-start flex items-center bg-[#f1f1f1]">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--vis-navy)] mb-10 md:mb-14 text-center md:text-left"
              initial="hidden"
              animate={activeSection === 3 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0}
            >
              Почему выбирают ВИС
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial="hidden"
                animate={activeSection === 3 ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={0.15}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--vis-navy)] mb-4">
                  Все в одном месте — более 500 наименований
                </h3>
                <p className="text-base md:text-lg text-[var(--vis-dark)] leading-relaxed">
                  Работаем с крупнейшими заводами России. Наличный и безналичный
                  расчёт. Помогаем с логистикой на удалённые объекты. Вы экономите
                  время и деньги.
                </p>
              </motion.div>

              <motion.div
                className="flex justify-center"
                initial="hidden"
                animate={activeSection === 3 ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={0.3}
              >
                <div className="w-full max-w-sm aspect-square bg-[var(--vis-navy)] rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--vis-orange)] opacity-20 rounded-bl-full" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-tr-full" />
                  <Icon name="Building2" size={80} className="text-white/80" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 5: SERVICES ============ */}
        <section className="h-screen snap-start flex items-center bg-white">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--vis-navy)] mb-10 md:mb-14 text-center"
              initial="hidden"
              animate={activeSection === 4 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0}
            >
              Наши услуги
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
              initial="hidden"
              animate={activeSection === 4 ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              {[
                {
                  icon: 'Warehouse',
                  title: 'Хранение',
                  desc: 'Ответственное хранение на складе 5000 м\u00B2',
                },
                {
                  icon: 'Truck',
                  title: 'Доставка',
                  desc: 'Собственный автопарк, любые объёмы',
                },
                {
                  icon: 'ClipboardList',
                  title: 'Комплектация заказов',
                  desc: 'Профессиональная отборка и упаковка',
                },
                {
                  icon: 'Container',
                  title: 'Приёмка-отправка',
                  desc: 'Вагонов и контейнеров в регионы',
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-[var(--vis-light)] rounded-lg p-6 md:p-8 flex items-start gap-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vis-navy)] flex items-center justify-center shrink-0">
                    <Icon name={service.icon} size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--vis-navy)] mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 6: COMPLETED PROJECTS ============ */}
        <section className="h-screen snap-start flex items-center bg-[var(--vis-light)]">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--vis-navy)] mb-3 text-center"
              initial="hidden"
              animate={activeSection === 5 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0}
            >
              Выполненные объекты
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-gray-500 mb-10 md:mb-14 text-center max-w-2xl mx-auto"
              initial="hidden"
              animate={activeSection === 5 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0.1}
            >
              Мы обеспечиваем стройматериалами крупнейшие объекты Приморского края
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              initial="hidden"
              animate={activeSection === 5 ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              {[
                { title: 'Гавань Резиденс', label: 'Жилой комплекс' },
                { title: 'Магазин "Парус"', label: 'Коммерческий объект' },
                { title: 'Промышленные объекты', label: 'Инфраструктура Приморья' },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-lg border border-gray-200 p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--vis-navy)] flex items-center justify-center mb-5">
                    <Icon name="Building" size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[var(--vis-navy)] mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500">{project.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 7: TESTIMONIALS ============ */}
        <section className="h-screen snap-start flex items-center bg-[#f1f1f1]">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--vis-navy)] mb-10 md:mb-14 text-center"
              initial="hidden"
              animate={activeSection === 6 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0}
            >
              Отзывы клиентов
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              initial="hidden"
              animate={activeSection === 6 ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              {[
                {
                  quote:
                    'Работаем с ВИС уже 5 лет. Всегда в наличии нужный ассортимент, оперативная доставка.',
                  author: 'ООО СтройГрупп',
                },
                {
                  quote:
                    'Надёжный поставщик. Ценим за стабильность цен и качество продукции.',
                  author: 'ИП Ковалёв',
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-lg p-8 md:p-10 shadow-md relative"
                >
                  <div className="text-5xl text-[var(--vis-orange)] opacity-30 font-serif absolute top-4 left-6">
                    &ldquo;
                  </div>
                  <p className="text-base md:text-lg text-[var(--vis-dark)] leading-relaxed mt-6 mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--vis-navy)] flex items-center justify-center">
                      <Icon name="User" size={18} className="text-white" />
                    </div>
                    <span className="font-semibold text-[var(--vis-navy)]">
                      {testimonial.author}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 8: CONTACT FORM ============ */}
        <section className="h-screen snap-start flex items-center bg-gradient-to-br from-[#1E3A5F] via-[#1a3355] to-[#0f2340]">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
            <div className="max-w-xl mx-auto">
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 md:mb-10 text-center"
                initial="hidden"
                animate={activeSection === 7 ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={0}
              >
                Рассчитайте стоимость материалов за 60 минут
              </motion.h2>

              <motion.form
                className="space-y-5"
                initial="hidden"
                animate={activeSection === 7 ? 'visible' : 'hidden'}
                variants={staggerContainer}
                onSubmit={(e) => e.preventDefault()}
              >
                <motion.div variants={staggerItem}>
                  <Input
                    placeholder="Ваше имя"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 text-base focus:border-[var(--vis-orange)]"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <Input
                    placeholder="Телефон / Max (мессенджер)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 text-base focus:border-[var(--vis-orange)]"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <select
                    className="w-full h-12 rounded-md border border-white/20 bg-white/10 px-3 text-base text-white/80 focus:outline-none focus:border-[var(--vis-orange)] appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-800">
                      Что нужно
                    </option>
                    <option value="napornye" className="text-gray-800">
                      Трубы напорные
                    </option>
                    <option value="beznapornye" className="text-gray-800">
                      Трубы безнапорные
                    </option>
                    <option value="ploskiy" className="text-gray-800">
                      Шифер плоский
                    </option>
                    <option value="volnovoy" className="text-gray-800">
                      Шифер волновой
                    </option>
                    <option value="volnakolor" className="text-gray-800">
                      Волнаколор
                    </option>
                  </select>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[var(--vis-orange)] hover:bg-[var(--vis-orange-hover)] text-white font-semibold h-12 text-base"
                  >
                    Получить расчёт
                  </Button>
                </motion.div>
                <motion.p
                  variants={staggerItem}
                  className="text-xs text-white/40 text-center"
                >
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </motion.p>
              </motion.form>
            </div>
          </div>
        </section>

        {/* ============ SECTION 9: CONTACTS ============ */}
        <section className="h-screen snap-start flex items-center bg-white">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--vis-navy)] mb-10 md:mb-14 text-center"
              initial="hidden"
              animate={activeSection === 8 ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0}
            >
              Контакты
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <motion.div
                className="space-y-6"
                initial="hidden"
                animate={activeSection === 8 ? 'visible' : 'hidden'}
                variants={staggerContainer}
              >
                <motion.div variants={staggerItem} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--vis-orange)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="MapPin" size={20} className="text-[var(--vis-orange)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--vis-navy)] mb-1">Адрес</div>
                    <div className="text-[var(--vis-dark)]">г. Артём, ул. Вокзальная 114</div>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--vis-orange)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="Phone" size={20} className="text-[var(--vis-orange)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--vis-navy)] mb-1">Телефоны</div>
                    <div className="text-[var(--vis-dark)]">
                      <a href="tel:+74232448010" className="hover:text-[var(--vis-orange)] transition-colors">
                        +7 (423) 244-80-10
                      </a>
                    </div>
                    <div className="text-[var(--vis-dark)]">
                      <a href="tel:+79147922784" className="hover:text-[var(--vis-orange)] transition-colors">
                        +7 (914) 792-27-84
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--vis-orange)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="MessageCircle" size={20} className="text-[var(--vis-orange)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--vis-navy)] mb-1">Мессенджер</div>
                    <div className="text-[var(--vis-dark)]">Max мессенджер</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="w-full aspect-[4/3] md:aspect-auto md:h-72 bg-[var(--vis-navy)] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
                initial="hidden"
                animate={activeSection === 8 ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={0.2}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rounded-full" />
                  <div className="absolute bottom-8 left-8 w-32 h-32 border border-white/20 rounded-full" />
                </div>
                <Icon name="MapPin" size={48} className="text-white/60 mb-3" />
                <span className="text-white/50 text-sm">г. Артём, ул. Вокзальная 114</span>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
