
import React from 'react';

const ImportantNotes = () => {
  return (
    <div className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-display font-semibold mb-6">Important Notes</h2>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          It's important to note that while COMPL-AI offers valuable insights into model compliance, it is not an official auditing tool for the EU AI Act. The assessments are intended to guide developers and organizations in aligning their AI systems with regulatory expectations.
        </p>
        <p className="text-muted-foreground">
          The evaluations provided here represent a point-in-time assessment based on the available information and testing methodologies. Model capabilities and performance may evolve with further updates and refinements.
        </p>
        <p className="text-muted-foreground">
          The table format presentation aligns each ethical principle from the EU AI Act with corresponding technical requirements and benchmark results, providing a comprehensive view of compliance evaluation.
        </p>
      </div>
    </div>
  );
};

export default ImportantNotes;
