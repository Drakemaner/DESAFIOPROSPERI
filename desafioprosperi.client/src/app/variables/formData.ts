import { Validators } from "@angular/forms";
import { IFormGroup } from "../interfaces/IFormGroup";

export var FormData : IFormGroup[] = 
    [
        {
          id: 0,
          label: "Número OS",
          formControlName: 'numeroOS',
          validators: [Validators.required, Validators.pattern('^[0-9]+$') , Validators.min(1)],
          placeholder: 'Apenas Valores Numéricos',
          input: {
            type: 'text'
          },
          editable: false
        },
        {
          id: 1,
          label: "Título OS",
          formControlName: 'titulo',
          validators: [Validators.required, Validators.minLength(6), Validators.maxLength(48)],
          input: {
            type: 'text'
          },
          editable: true
        },
        {
          id: 2,
          label: "CNPJ Cliente",
          formControlName: 'cnpjCliente',
          validators: [
            Validators.required,
            Validators.pattern('^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$'), // Pattern correto para CNPJ
            Validators.minLength(18), // Incluindo os caracteres de formatação
            Validators.maxLength(18)
          ],
          placeholder: '00.000.000/0000-00',
          input: {
            type: 'text'
          },
          editable: true
        },
        {
          id: 3,
          label: "Nome Cliente",
          formControlName: 'nomeCliente',
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
          input: {
            type: 'text'
          },
          editable: true
        },
        {
          id: 4,
          label: "CPF do Prestador de Serviço",
          formControlName: 'cpfPrestador',
          validators: [
            Validators.required,
            Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$'), // Pattern correto para CPF
            Validators.minLength(14), // Incluindo os caracteres de formatação
            Validators.maxLength(14)
          ],
          placeholder: '000.000.000-00',
          input: {
            type: 'text'
          },
          editable: true
        },
        {
          id: 5,
          label: "Nome do Prestador de Serviço",
          formControlName: 'nomePrestador',
          validators: [
                        Validators.required, 
                        Validators.minLength(4), 
                        Validators.maxLength(32),
                      ],
          input: {
            type: 'text'
          },
          editable: true
        },
        {
          id: 6,
          label: "Data de Execução do Serviço",
          formControlName: 'dataExecucao',
          validators: [Validators.required],
          input: {
            type: 'date'
          },
          editable: true
        },
        {
          id: 7,
          label: "Valor do Serviço",
          formControlName: 'valor',
          validators: [
                        Validators.required, 
                        Validators.pattern('^[0-9]+(,[0-9]+)?$'), // Pattern para aceitar apenas números e vírgula
                        Validators.min(1)
                      ],
          placeholder: '0,00',
          input: {
            type: 'text'
          },
          editable: true
        }
]