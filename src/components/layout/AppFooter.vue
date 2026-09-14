<template>
  <footer class="footer">
    <div class="shell">
      <div class="footer__cta">
        <p class="mono mono--accent">Pronto quando você estiver</p>
        <h2 class="footer__pitch">
          Marque a avaliação e saia sabendo <em>exatamente</em> o que precisa ser feito.
        </h2>
        <CtaButton :href="whatsappHref" variant="primary" arrow>
          Chamar no WhatsApp
        </CtaButton>
      </div>

      <div class="footer__grid">
        <nav aria-label="Rodapé — navegação">
          <p class="mono footer__label">Navegação</p>
          <ul>
            <li v-for="link in links" :key="link.to">
              <RouterLink :to="link.to">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div>
          <p class="mono footer__label">Contato</p>
          <ul>
            <li>
              <a :href="whatsappHref" target="_blank" rel="noopener noreferrer">
                {{ clinic.whatsappDisplay }}
              </a>
            </li>
            <li><a :href="`mailto:${clinic.email}`">{{ clinic.email }}</a></li>
            <li class="footer__plain">{{ clinic.address.full }}</li>
          </ul>
        </div>

        <div>
          <p class="mono footer__label">Redes</p>
          <ul>
            <li v-for="(url, key) in clinic.social" :key="key">
              <template v-if="url">
                <a :href="url" target="_blank" rel="noopener noreferrer">
                  {{ socialLabel(key) }}
                </a>
              </template>
            </li>
          </ul>
        </div>

        <div>
          <p class="mono footer__label">Horários</p>
          <ul>
            <li v-for="h in clinic.hours" :key="h.days" class="footer__plain">
              {{ h.days }} · {{ h.time }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p class="footer__wordmark" aria-hidden="true">{{ clinic.name }}</p>

    <div class="shell footer__bottom">
      <p class="mono">© {{ year }} {{ clinic.name }}</p>
      <p class="mono">Protótipo de vitrine · Conteúdo fictício</p>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import CtaButton from '../ui/CtaButton.vue'
import { clinic } from '../../data/clinic'
import { useWhatsApp } from '../../composables/useWhatsApp'

const { href: whatsappHref } = useWhatsApp(
  clinic.whatsapp,
  clinic.whatsappDefaultMessage,
)

const year = new Date().getFullYear()

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'A clínica' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/contato', label: 'Contato' },
]

function socialLabel(key) {
  const map = { instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube' }
  return map[key] || key
}
</script>

<style scoped>
.footer {
  background: var(--ink-deep);
  border-top: 1px solid var(--line);
  padding-top: clamp(3.5rem, 8vw, 7rem);
  margin-top: auto;
  overflow: hidden;
}

.footer__cta {
  padding-bottom: clamp(3rem, 6vw, 5rem);
  border-bottom: 1px solid var(--line);
}

.footer__cta > .mono {
  margin: 0 0 1.25rem;
}

.footer__pitch {
  font-size: clamp(1.75rem, 5vw, 3.75rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.03em;
  max-width: 18ch;
  margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
}

.footer__pitch em {
  font-style: italic;
  color: var(--accent);
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(2rem, 4vw, 3rem);
  padding-block: clamp(2.5rem, 5vw, 4rem);
}

@media (min-width: 900px) {
  .footer__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.footer__label {
  margin: 0 0 1.25rem;
}

.footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer__grid a {
  color: var(--paper-soft);
  font-size: 0.97rem;
  transition: color 0.3s ease;
}

.footer__grid a:hover {
  color: var(--accent);
}

.footer__plain {
  color: var(--paper-faint);
  font-size: 0.9rem;
  line-height: 1.5;
}

.footer__wordmark {
  margin: 0;
  padding-inline: var(--gutter);
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(3.5rem, 17vw, 15rem);
  line-height: 0.85;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(42, 36, 32, 0.16);
  white-space: nowrap;
  user-select: none;
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.75rem;
  padding-bottom: 5rem;
  border-top: 1px solid var(--line);
  margin-top: clamp(1.5rem, 4vw, 3rem);
}

.footer__bottom p {
  margin: 0;
}
</style>
