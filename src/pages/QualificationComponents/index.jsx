import 'bootstrap/dist/css/bootstrap.min.css';
import "./Qualification.scss";
import QualificationFormComponent from './QualificationFormComponents';
import QualificationTittleComponent from './QualificationTittleComponents';
import QualificationViewComponent from './QualificationViewComponent';

const QualificationComponents = () => {
  return (
    <div>

      <QualificationTittleComponent />
    
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <QualificationFormComponent />
            <QualificationViewComponent />
          </div>
        </div>
      </section>
    </div>
  )
}

export default QualificationComponents;