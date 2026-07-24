<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)
const openFaq = ref<number | null>(null)

const SUBJECTS = [
  'Order Issue',
  'Product Question',
  'Return / Refund',
  'Technical Support',
  'Billing',
  'Other',
]

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 3–5 business days. Express 1–2 day delivery is available at checkout.',
  },
  {
    q: 'Can I return a product?',
    a: 'Yes — 30-day hassle-free returns on all items. Products must be unused and in original packaging.',
  },
  {
    q: 'Do products come with a warranty?',
    a: "All products include the manufacturer's warranty, typically 1 year.",
  },
  {
    q: 'What payment methods are accepted?',
    a: 'All major credit/debit cards, PayPal, and bank transfers. SSL secured.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once shipped you will receive a tracking email. Log in to your account to check order status.',
  },
  {
    q: 'Is my personal data safe?',
    a: 'We use AES-256 encryption and never share personal data with third parties.',
  },
]

const submitForm = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    return
  }

  submitting.value = true

  await new Promise(resolve => setTimeout(resolve, 1200))

  submitted.value = true
  submitting.value = false
}
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
    <div class="mb-6 sm:mb-10">
      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
        Support Center
      </h1>

      <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400">
        We're here to help — 7 days a week.
      </p>
    </div>

    <!-- Contact Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
        <div class="text-3xl mb-3">📧</div>
        <p class="font-bold text-sm text-gray-900 dark:text-white mb-1">Email Us</p>
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">support@technest.com</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">Reply within 24 hours</p>
      </div>

      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
        <div class="text-3xl mb-3">📞</div>
        <p class="font-bold text-sm text-gray-900 dark:text-white mb-1">Call Us</p>
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">+1 (800) 123-4567</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">Mon–Fri, 9 am – 6 pm EST</p>
      </div>

      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
        <div class="text-3xl mb-3">💬</div>
        <p class="font-bold text-sm text-gray-900 dark:text-white mb-1">Live Chat</p>
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available on site</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">Mon–Sun, 8 am – 10 pm EST</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
      <!-- Form -->
      <div>
        <h2 class="text-xl font-black text-gray-900 dark:text-white mb-5">
          Send us a message
        </h2>

        <div
          v-if="submitted"
          class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-2xl p-8 sm:p-10 text-center"
        >
          <div class="text-5xl mb-4">✅</div>

          <p class="text-green-700 dark:text-green-400 font-black text-lg mb-1">
            Message sent!
          </p>

          <p class="text-green-600 dark:text-green-400 text-sm mb-6">
            We'll get back to you within 24 hours.
          </p>

          <button
            @click="submitted = false; form = { name: '', email: '', subject: '', message: '' }"
            class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            Send another
          </button>
        </div>

        <div
          v-else
          class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 sm:p-6 space-y-4"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold mb-1.5 uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Name *
              </label>

              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label class="block text-xs font-bold mb-1.5 uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Email *
              </label>

              <input
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
                class="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold mb-1.5 uppercase tracking-wide text-gray-700 dark:text-gray-300">
              Subject
            </label>

            <select
              v-model="form.subject"
              class="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none"
            >
              <option value="">Select a subject...</option>
              <option
                v-for="subject in SUBJECTS"
                :key="subject"
                :value="subject"
              >
                {{ subject }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold mb-1.5 uppercase tracking-wide text-gray-700 dark:text-gray-300">
              Message *
            </label>

            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Describe your issue..."
              class="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 resize-none"
            />
          </div>

          <button
            @click="submitForm"
            :disabled="submitting || !form.name || !form.email || !form.message"
            class="w-full py-3 rounded-xl font-bold text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
          >
            {{ submitting ? 'Sending...' : 'Send Message' }}
          </button>
        </div>
      </div>

      <!-- FAQ -->
      <div>
        <h2 class="text-xl font-black text-gray-900 dark:text-white mb-5">
          Frequently Asked Questions
        </h2>

        <div class="space-y-2 mb-6">
          <div
            v-for="(faq, index) in FAQS"
            :key="index"
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
          >
            <button
              @click="openFaq = openFaq === index ? null : index"
              class="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
            >
              <span class="font-semibold text-sm text-gray-900 dark:text-white">
                {{ faq.q }}
              </span>

              <span
                :class="openFaq === index ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 rotate-45' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
                class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              >
                +
              </span>
            </button>

            <div
              v-show="openFaq === index"
              class="border-t border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-5 py-4 text-sm leading-relaxed"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
          <p class="font-black text-sm text-gray-900 dark:text-white mb-3">
            🏢 Our Office
          </p>

          <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
            <p>📍 123 Tech Street, Suite 400</p>
            <p>🏙 San Francisco, CA 94105, USA</p>
            <p>🕐 Mon–Fri, 9 am – 6 pm PST</p>
            <p>✉️ support@technest.com</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>