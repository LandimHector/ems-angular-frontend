import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrincipalComponent } from "./principal/principal.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, PrincipalComponent]
})
export class AppComponent {
  title = 'api-front';
}
