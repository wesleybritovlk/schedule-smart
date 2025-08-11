import { Component } from '@angular/core';

@Component({
  selector: 'app-public-about',
  imports: [],
  template: `
    <section class="fade-wrapper min-h-[calc(100vh-4rem)] min-w-[calc(100vw-1rem)] bg-white flex items-center justify-center px-6 md:px-12 lg:px-24">
      <div class="max-w-5xl w-full text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-6">📌 Sobre a Plataforma</h2>
        <p class="text-lg text-gray-600 mb-12">
          Somos uma plataforma de agendamento inteligente, feita para simplificar a rotina de empresas que prestam serviços.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-3">👥 Cadastre Funcionários</h3>
            <p class="text-gray-700 leading-relaxed">Adicione sua equipe com facilidade e defina quem realiza cada serviço.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-3">🛠️ Gerencie Serviços</h3>
            <p class="text-gray-700 leading-relaxed">Configure os serviços oferecidos, valores, duração e disponibilidade.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-indigo-600 mb-3">📅 Controle de Agendamentos</h3>
            <p class="text-gray-700 leading-relaxed">Acompanhe datas, horários e o histórico de cada cliente com praticidade.</p>
          </div>
        </div>
        <p class="mt-14 text-gray-500 text-sm">
          Tudo isso em uma interface simples, intuitiva e pensada para o seu dia a dia.
        </p>
      </div>
    </section>
  `,
  styleUrl: './public-about.page.scss'
})
export class PublicAboutPage {

}
