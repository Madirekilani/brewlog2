import { useState } from "react";
import BrewModal from "./brewModal";

export default function Brew() {
  const [addBrewData, setAddBrewData] = useState({ /* ... */ });
  const [editBrewData, setEditBrewData] = useState({ /* ... */ });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const brewingMethods = [/* ... */];

  return (
    <div>
      <button onClick={() => setShowAddModal(true)}>Add Brew</button>
      <button onClick={() => setShowEditModal(true)}>Edit Brew</button>

      <BrewModal
        isOpen={showAddModal}
        title="Add a brew"
        data={addBrewData}
        onDataChange={setAddBrewData}
        onClose={() => setShowAddModal(false)}
        brewingMethods={brewingMethods}
      />
      <BrewModal
        isOpen={showEditModal}
        title="Edit a brew"
        data={editBrewData}
        onDataChange={setEditBrewData}
        showDelete={true}
        onClose={() => setShowEditModal(false)}
        brewingMethods={brewingMethods}
      />
    </div>
  );
}