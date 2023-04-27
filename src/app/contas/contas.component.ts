import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContasService } from '../services/contas.service';
import { Response } from 'app/shared/models/Response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss']
})
export class ContasComponent implements OnInit {

  public formGroup: FormGroup;
  public contasList: any;
  public contaEdit: any;

  constructor(private formBuilder: FormBuilder, private contasService: ContasService) {

    this.formGroup = this.formBuilder.group({
      Agencia:  ['', [Validators.required]],
      Numero:   ['', [Validators.required]],
      Saldo:    [0, [Validators.required]],
      Cliente: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.getAll();
  }

  create(objFormValues): void {
    const request = {
      ...objFormValues
    };

    if (this.contaEdit != null) {
      this.contasService.put(this.contaEdit.id, request).subscribe((response: Response) => {
        if (!response.hasErrors) {
          Swal.fire({
            title: 'Atenção',
            text: 'Conta alterada com sucesso.',
            icon: 'success',
            showCancelButton: false
          });
          this.cleanFormInputs();
          this.getAll();
        }
        else {
          Swal.fire({
            title: 'Atenção',
            text: 'Ocorreu um erro ao tentar alterar a conta.\n' + response.errorMessages[0],
            icon: 'warning',
            showCancelButton: false
          });
        }
      }, (error) => {
        Swal.fire({
          title: 'Atenção',
          text: 'Ocorreu um erro ao tentar alterar a conta.\n' + error.errorMessages[0],
          icon: 'error',
          showCancelButton: false
        });
        console.log(error);
      }, () => {
      });
    }
    else {
      this.contasService.post(request).subscribe((response: Response) => {
        if (!response.hasErrors) {
          Swal.fire({
            title: 'Atenção',
            text: 'Conta adicionada com sucesso.',
            icon: 'success',
            showCancelButton: false
          });
          this.cleanFormInputs();
          this.getAll();
        }
        else {
          Swal.fire({
            title: 'Atenção',
            text: 'Ocorreu um erro ao tentar adicionar a conta.\n' + response.errorMessages[0],
            icon: 'warning',
            showCancelButton: false
          });
        }
      }, (error) => {
        Swal.fire({
          title: 'Atenção',
          text: 'Ocorreu um erro ao tentar adicionar a conta.\n' + error.errorMessages[0],
          icon: 'error',
          showCancelButton: false
        });
        console.log(error);
      }, () => {
      });
    }
  }

  private getAll(): void {
    this.contasService.get().subscribe((response: Response) => {
      if (!response.hasErrors) {
        this.contasList = response.data;
      }
    }, (error) => {
      console.log(error);
    })
  }

  public editItem(conta): void {
    this.contasService.getSingle(conta.id).subscribe((response: Response) => {
      if (!response.hasErrors) {
        console.log(response.data);
        this.contaEdit = response.data;
        this.formGroup.controls.Agencia.setValue(response.data.agencia);
        this.formGroup.controls.Numero.setValue(response.data.numero);
        this.formGroup.controls.Saldo.setValue(response.data.saldo);
        this.formGroup.controls.Cliente.setValue(response.data.cliente);
      }
    }, (error) => {
      console.log(error);
    })
  }

  public deleteItem(conta): void {
    this.contasService.delete(conta.id).subscribe((response: Response) => {
      if (!response.hasErrors) {
        Swal.fire({
          title: 'Atenção',
          text: 'Conta apagada com sucesso',
          icon: 'success',
          showCancelButton: false
        });
        this.cleanFormInputs();
        this.getAll();
      }
      else {
        Swal.fire({
          title: 'Atenção',
          text: 'Ocorreu um erro ao tentar apagar a conta.\n' + response.errorMessages[0],
          icon: 'warning',
          showCancelButton: false
        });
      }
    }, (error) => {
      Swal.fire({
        title: 'Atenção',
        text: 'Ocorreu um erro ao tentar apagar a conta.\n' + error.errorMessages[0],
        icon: 'error',
        showCancelButton: false
      });
      console.log(error);
    })
  }

  public cleanFormInputs(): void {
    this.formGroup.controls.Agencia.setValue("");
    this.formGroup.controls.Numero.setValue("");
    this.formGroup.controls.Saldo.setValue("");
    this.formGroup.controls.Cliente.setValue("");
    this.contaEdit = null;
  }
}
