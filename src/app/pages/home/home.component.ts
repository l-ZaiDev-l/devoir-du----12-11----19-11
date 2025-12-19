import { Component, signal } from '@angular/core';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';
import { ClickableContainerComponent } from '../../shared/components/UI/clickable-container/clickable-container.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [PageWrapperComponent, ClickableContainerComponent],
template: `
  <app-page-wrapper class="min-h-screen p-8">
    <!-- Header -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">
        Welcome to <span class="text-indigo-600">SmartShop</span>
      </h1>

      <div class="h-1 w-20 bg-indigo-600 rounded-full mt-4 mx-auto"></div>

      <p class="text-gray-500 text-lg mt-6 max-w-xl mx-auto">
        Choose an area below to continue your experience.
      </p>
    </div>

    <!-- Blurred Cards -->
    <div class="grid sm:grid-cols-3 gap-8 mb-16">
      
      <app-container
        link="/dev"
        class="cursor-pointer p-6 rounded-xl
               bg-white/30 backdrop-blur-md shadow-lg
               transition-all duration-300
               hover:bg-white/50 hover:shadow-2xl hover:-translate-y-2"
      >
        <h2 class="text-lg font-semibold text-gray-900">
          MSW Test Area
        </h2>
        <p class="text-gray-500 text-sm mt-2">
          API development and simulation space
        </p>
      </app-container>

      <app-container
        link="/admin/dashboard"
        class="cursor-pointer p-6 rounded-xl
               bg-white/30 backdrop-blur-md shadow-lg
               transition-all duration-300
               hover:bg-white/50 hover:shadow-2xl hover:-translate-y-2"
      >
        <h2 class="text-lg font-semibold text-gray-900">
          Admin section
        </h2>
        <p class="text-gray-500 text-sm mt-2">
          Administrator's area
        </p>
      </app-container>

      <app-container
        link="/login"
        class="cursor-pointer p-6 rounded-xl
               bg-white/30 backdrop-blur-md shadow-lg
               transition-all duration-300
               hover:bg-white/50 hover:shadow-2xl hover:-translate-y-2"
      >
        <h2 class="text-lg font-semibold text-gray-900">
          Access the app
        </h2>
        <p class="text-gray-500 text-sm mt-2">
          The main application
        </p>
      </app-container>

    </div>
  </app-page-wrapper>
`,
})



export class HomeComponent {
  protected readonly title = signal('my-shop');
}
