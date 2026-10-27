
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RequestService,
  FacilityRequest
} from './request.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  requests: FacilityRequest[] = [];

  formData: FacilityRequest = {
    name: '',
    department: '',
    facility: 'Computer Lab',
    description: ''
  };

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage =
          'Unable to load records. Check the backend and MongoDB.';
      }
    });
  }

  submitRequest(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (
      !this.formData.name.trim() ||
      !this.formData.department.trim() ||
      !this.formData.description.trim()
    ) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.loading = true;

    this.requestService.addRequest(this.formData).subscribe({
      next: (response) => {
        this.successMessage = response.message;

        this.formData = {
          name: '',
          department: '',
          facility: 'Computer Lab',
          description: ''
        };

        this.loading = false;
        this.loadRequests();
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Unable to save the request.';
        this.loading = false;
      }
    });
  }
}

