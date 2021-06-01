import { v4 as UUID } from "uuid";

// Interfaces
interface IProps {
  id?: string;
  name: string;
  location: string;
  about: string;
}

interface IOtterInterface extends IProps {
  timestamp: number;
}

export default class OtterModel {
  private _id: string;
  private _name: string;
  private _about: string;
  private _location: string;

  constructor({ id = UUID(), name = "" }: IProps) {
    this._id = id;
    this._location = name;
    this._about = name;
    this._name = name;
  }

  /**
   * Set Id
   * @param value
   */
  setId(value: string): void {
    this._id = value !== "" ? value : null;
  }

  /**
   * Get Id
   * @return {string|*}
   */
  getId(): string {
    return this._id;
  }

  /**
   * Set Name
   * @param value
   */
  setName(value: string): void {
    this._name = value !== "" ? value : null;
  }

  /**
   * Get Location
   * @return {string|*}
   */
  getLocation(): string {
    return this._location;
  }
  setLocation(value: string): void {
    this._location = value !== "" ? value : null;
  }

  /**
   * Get About
   * @return {string|*}
   */
  getAbout(): string {
    return this._about;
  }
  setAbout(value: string): void {
    this._about = value !== "" ? value : null;
  }

  /**
   * Get Name
   * @return {string|*}
   */
  getName(): string {
    return this._name;
  }

  /**
   * Get Base entity mappings
   * @return {IOtterInterface}
   */
  getEntityMappings(): IOtterInterface {
    return {
      id: this.getId(),
      name: this.getName(),
      location: this.getLocation(),
      about: this.getAbout(),
      timestamp: new Date().getTime(),
    };
  }
}
