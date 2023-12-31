import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { SurveyTypeService } from '../survey-type.service'
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit  {

  public fileUrl: string = env.fileUrl;
  @ViewChild('updateNgForm') updateNgForm: NgForm;
  UpdateProject = new EventEmitter();
  public saving: boolean = false;
  public update: UntypedFormGroup;
  public isLoading: boolean = false;
  public data: any;
  public mode: any;
  public src: string = 'assets/icons/icon-img.png';
  public products_type: any[][];
  public regulator_type: any[][];
  constructor(
    @Inject(MAT_DIALOG_DATA) public getRow: any,
    private dialogRef: MatDialogRef<UpdateComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _surveyTypeService: SurveyTypeService,
    private snackBar: SnackbarService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
   // console.log(this.getRow);
    this.src = this.fileUrl+this.getRow?.image;
    this.formBuilder();
  }

  srcChange($event: any) {
    this.update.get('image').setValue($event);
  }

  formBuilder(): void {
    this.update = this._formBuilder.group({
      name: [this.getRow?.name, Validators.required],
      image: [],
    });
  }

  submit(): void {
    // Return if the form is invalid
    if (this.update.invalid) {
      return;
    }

    // Disable the form
    this.update.disable();

    // Saving
    this.saving = true;

    // call to api
    this._surveyTypeService.update(this.getRow.id,this.update.value).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.UpdateProject.emit(res.survey_type);
        //use snack bar to opron message
        this.snackBar.openSnackBar(res.message, '');
      },
      (err: any) => {

        // Re-enable the form
        this.update.enable();

        // saved
        this.saving = false;

        let errors: any[] = [];
        errors = err.error.errors;
        let messages: any[] = [];
        let text: string = '';
        if (errors.length > 0) {
          errors.forEach((v: any) => {
            messages.push(v.message)
          });
          if (messages.length > 1) {
            text = messages.join('-');
          } else {
            text = messages[0];
          }
        } else {
          text = err.error.message;
        }
        this.snackBar.openSnackBar(text, 'error');
      }
    );
  }

}
