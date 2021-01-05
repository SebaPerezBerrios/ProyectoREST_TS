import { Association, Optional, Model } from 'sequelize';

interface CarrerasEntry

interface EntryCreationAttributes extends Optional<DBEntry.Entry, '_id' | '_deleted' | 'created'> {}

export class EntryModel extends Model<DBEntry.Entry, EntryCreationAttributes> implements DBEntry.Entry {
  public _id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public hash!: string;
  public created!: string;
  public extractor!: string;
  public metaKey!: string;
  public content!: string;
  public _deleted!: boolean;

  public readonly Analysis?: AnalysisModel;
  public static associations: {
    Analysis: Association<EntryModel, AnalysisModel>;
  };
}

interface AnalysisCreationAttributes
  extends Optional<DBAnalysis.Analysis, '_id' | '_deleted' | 'completionDate' | 'modelVersion'> {}

export class AnalysisModel
  extends Model<DBAnalysis.Analysis, AnalysisCreationAttributes>
  implements DBAnalysis.Analysis {
  public _id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public _entryId: number;
  public completionDate!: string;
  public modelVersion!: string;
  public _deleted!: boolean;
  public Asertividad!: number;
  public 'Autoconciencia Emocional'!: number;
  public Autoestima!: number;
  public 'Colaboración y Cooperación'!: number;
  public 'Comprensión Organizativa'!: number;
  public 'Conciencia Crítica'!: number;
  public 'Desarrollo de las relaciones'!: number;
  public Empatía!: number;
  public Influencia!: number;
  public Liderazgo!: number;
  public 'Manejo de conflictos'!: number;
  public 'Motivación de logro'!: number;
  public Optimismo!: number;
  public 'Percepción y comprensión Emocional'!: number;
  public 'Relación Social'!: number;
  public 'Tolerancia a la frustración'!: number;
  public Violencia!: number;

  public readonly Entry?: EntryModel;
  public static associations: {
    Entry: Association<AnalysisModel, EntryModel>;
  };
}
