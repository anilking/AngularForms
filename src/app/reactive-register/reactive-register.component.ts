import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailAsyncValidator, netcrackerEmailValidator } from '../custom-validators/mail-validator';

@Component({
  selector: 'app-reactive-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './reactive-register.component.html',
  styleUrl: './reactive-register.component.css'
})
export class ReactiveRegisterComponent {

  registerForm: FormGroup;
  newFname: string = '';
  fnameMinLength: number | null = null;


  nameControl = new FormControl('',[Validators.required]);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fname: ['anil', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, netcrackerEmailValidator()],[emailAsyncValidator]],
      languages: this.fb.array([]),
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.onEmailValueChanges();
    //this.addLanguage()
  }

  toggleDisable(controlName: string) {
    debugger
    const control = this.registerForm.get(controlName);
    if (control?.disabled) {
      control.enable(); 
    } else {
      control?.disable();
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  updateNames() {
    if (this.newFname) {
      this.registerForm.patchValue({
        fname: this.newFname || '',
        lname: "lname"
      });
    }

    if (this.fnameMinLength) {
      this.registerForm.get('fname')?.setValidators([Validators.required, Validators.minLength(this.fnameMinLength)]);
      this.registerForm.get('fname')?.updateValueAndValidity();
    } else {
      this.registerForm.get('fname')?.setValidators([Validators.required]);
      this.registerForm.get('fname')?.updateValueAndValidity();
    }
  }

  onReset() {
    this.registerForm.reset();
    this.newFname = '';
    this.fnameMinLength = null;
  }

  onEmailValueChanges(): void {
    this.registerForm.get('email')?.valueChanges.subscribe(newValue => {
      console.log('Email updated to:', newValue);
    });
  }

  onEmailChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Email updated to:', input.value);
  }


  get languages(): FormArray {
    return this.registerForm.get('languages') as FormArray;
  }

  addLanguage(): void {
    const languageGroup = this.fb.group({
      name: ['', Validators.required]
    });
    this.languages.push(languageGroup);
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

}
