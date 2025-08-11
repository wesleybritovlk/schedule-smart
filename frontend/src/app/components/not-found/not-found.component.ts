import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="flex items-center justify-center h-screen bg-gray-100 text-center px-4">
      <div class="max-w-md">
        <h1 class="text-6xl font-bold text-blue-600 mb-2">404</h1>
        <h2 class="text-2xl font-semibold mb-4">Página não encontrada</h2>
        <p class="text-gray-600 mb-6">A página que você tentou acessar não existe ou foi removida.</p>
        <a
          routerLink="/"
          class="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Voltar para a página inicial
        </a>
      </div>
    </section>
  `,
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
