import React, { useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(
  supabaseUrl,

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbGN4dGl4Z3F4ZnV2cnFndGhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODM0MzYwMywiZXhwIjoxOTkzOTE5NjAzfQ.6_AnKSHkt5kARd6tK5JVnLCNm8ATQFHiuXjnGtOBCcc",

  {
    auth: {
      autoRefreshToken: false,

      persistSession: false,

      detectSessionInUrl: false,
    },
  }
);

function App() {
  const [response, setResponse] = useState({ data: null, error: null });

  async function deleteUsers() {
    const deleteArray = [
      "f70b83ad-c671-46e4-9f53-536a7f9aad2c",

      "fa746ae0-3d15-425b-aa36-e394a4283229",

      "80a46a24-7c6a-4d02-ad62-b093c735ebfc",

      "144ae6af-4362-4d54-93ad-ca45f7db31c3",

      "56526d36-48a6-49c4-8320-e713c20d9e66",

      "2d3a33e3-befc-4272-82ee-2937f9b3029d",

      "1815c90b-4327-4db4-9644-ce27124aa64c",

      "653e6afb-1b60-44e0-9925-3634df983caa",

      "9f8873aa-cbb6-4bbc-b84e-58c8fbf12084",

      "23e92356-848e-424c-9d4a-43439d44a800",

      "556de3d5-0c50-4a2a-ac28-8783a60f99af",

      "0cbcb0ef-c89f-4754-bad1-b5c25efc819a",

      "ccff50d6-05d8-4df7-bca6-73fabd086b4a",

      "f2611252-d678-4bf6-b9b8-af6785555581",

      "04bed3a7-fdfb-4ba1-a740-1d78da656c30",

      "20783ed8-e690-45c6-a18e-c9db45514042",

      "b17e63aa-9c11-40c2-a447-9bc2bdd8ae98",

      "9d30935b-7fac-4047-8650-9391881e3130",

      "2bc0eca3-b46f-44e4-bf7f-5d68913592b3",

      "e807d895-fbdb-4930-bf4f-14e111b97a30",

      "e7ac9c5f-6419-4f77-959a-a4db807047fb",

      "13e61f52-638d-4e80-91ec-90bd4ed8623d",

      "217bffe9-0608-4343-9275-ee4efdf04aa7",

      "6b168f80-7407-4cb8-84d8-f68949e5ae36",

      "ae055d71-cf86-4e92-bdea-9a1fabdc281b",

      "2f332a1d-bc93-420c-a0a1-cba5b2e6f6b2",

      "3279a035-d3da-4bd7-884d-6e6734b96651",

      "fcac1b83-5f50-4dac-8363-a9d884d599f1",

      "b40cf6a3-139c-47a9-a136-81e156a75088",

      "3d8b35d2-73b1-46d3-ba54-f9b0c61ed96a",

      "b4577f78-46f7-4679-a363-32213f5f711a",

      "b4577f78-46f7-4679-a363-32213f5f711a",

      "338bd93e-5281-4012-8f62-526ad6ee32aa",

      "a46a94ee-da82-4e0f-b790-6553f36c1323",

      "f6525e11-6e24-42cc-a9f4-ca6d50b694b6",

      "31a0e7d9-2edc-4b0c-962b-c2fb034a4d74",

      "d0e66881-c853-445c-bd4a-34c5ebce62dd",

      "7f4a23a0-e613-44c1-bcb1-3b79115c42d8",

      "b82d8038-c827-4386-ae1b-4c9c4be7f6d5",

      "c709552f-3421-496c-8058-0f452eddb4ad",

      "5d42f6c9-412a-4c4a-82a3-a7d5a4755e71",

      "d1fd196a-4c71-4f34-adf7-c9b18726b22a",

      "c9507f98-92bd-4a8d-a559-b8e0a1718ef3",

      "19e10072-1521-497a-8689-697c84f492c6",

      "24388251-7948-4285-8f4c-181f5be6e53a",

      "ee70df64-7629-465b-9dc3-6918e3201c7a",

      "1c53de24-0501-4b39-a583-dc4ded511dc0",

      "b435bda3-8c7a-4bf8-bd98-033040af9e00",

      "3d88239e-e47b-4ee1-b24e-c53babb4dbe2",

      "f7ba9c54-bccb-4607-863a-3f27e8300999",

      "4a2fe62d-2b59-4826-a66a-1d5567725234",

      "b59f4a71-e749-480a-8e45-ed459aea6658",

      "afc9c9b6-dc79-4c46-a8aa-8c6fb3e92c6a",

      "f046b170-ab4a-4390-95cf-acabf8541600",

      "5cdaf173-74f6-4f05-9720-2a03d792c240",

      "b9695c95-d3d5-4703-9a87-e90a9330bb10",

      "76adff24-78bc-4cd2-8017-567ec8827bb1",

      "4e3e751e-fc8d-4b25-8c5b-aadc594f80cb",

      "a4daeaaa-fe48-496c-9cee-e21a5ba74c99",

      "a7369e11-5854-4d1c-98ad-205a0d172b75",

      "0a94f7e0-6bb9-46d3-9035-4dee849b7adc",

      "e95f061b-b9c3-4cf6-9f2d-be51a121504f",

      "033e1de3-e7bd-42f0-b01d-887e0c8a6149",

      "9b2423ab-0d17-4ea6-9469-bc95fedcbf04",

      "df1bd0a1-92d4-4f32-a182-708be5b2016b",

      "a99003bb-2c01-4ae8-b25a-65975d2edb8b",

      "b964a08b-962c-459e-98e2-e55f20c96b61",

      "25e535fc-24d4-485b-b5c9-0a382ce715ac",

      "3ae3b063-2dd8-488e-9fe1-5d7e4a48c0c5",

      "e86733a4-9c79-4a51-9143-47d9bd6b9193",

      "5f32c8b9-2a4b-420f-aaab-7ed5f4f72cbc",

      "a74dd7bf-f253-4747-b84e-f3e26efd18d4",

      "947da7a8-2e03-4c6b-882e-68ed7c996ff3",

      "33fb287a-2040-46ee-80ef-3d7cefbcc433",

      "aeb5a43f-9eb1-467e-8345-9042b9c4c5aa",

      "b0a3ebbe-14fa-425d-b0e4-7a8de3fba87e",

      "f69af52f-1ef3-4655-a6be-bdddeb5601fe",

      "e68c00ba-2e9b-48d9-9338-af8f829846fe",

      "887e5f47-01fb-4785-9c0a-0b442cb8ada3",

      "7635a4bf-dc6b-46d0-848d-9fd8ee90d739",

      "a622f8cf-4102-4cd6-9fca-a8f27c87725b",

      "e7567c8b-982d-452c-90ae-80082e8e9c6e",

      "e1770f85-0f68-4622-90f7-57c76ca2c028",

      "50bb5bcd-b7d6-4cfd-a09f-4ce877c0d19a",

      "2e203aec-07ae-4c7e-9fc8-6dec31c2fd46",

      "2742a3d6-53a4-4d7e-b1e6-5d32d26e0fa7",

      "2f899ba7-824b-4762-9ba0-a21ad6820cdd",

      "9a077e28-17cc-4a97-a5c8-3d4ada6b5840",

      "19e34720-a750-494d-8f5d-6f0354899a0a",

      "71d1c023-3499-4055-a34d-75bd4d06c2f1",

      "49558e13-cade-4a7d-bf4d-dba3b2e87655",

      "d63b915c-1115-4a57-ad7b-5618a97123d9",

      "1a73d407-f657-4e2e-a64f-aaa934a68375",

      "4f82b09d-60ff-474a-aad5-f6f2901a6020",

      "886867ec-4be4-4e93-8b4d-4c4b1c6cd22e",

      "ddd8aa9a-6bc9-41df-a0c3-ae90c24acbde",

      "1c79e5fb-b850-4529-a032-397fe0eab98e",

      "b5d39eb7-604e-4f1e-8c21-76390bb99536",

      "98b84431-d875-4d0a-b336-ef8cdca27de6",

      "36f8c6a7-addf-4423-aae2-7c3e306d0cb3",

      "6a636e6e-5bf8-4705-b9a1-dd3e3b7f9386",

      "86323e72-86c3-41fa-91ac-56f4c006de5c",

      "f43afa39-5b8b-4a88-a054-2c654fb5c7f4",

      "733ecce5-44f2-4a91-83c7-aea759e90a46",

      "48eeab5b-0325-4b59-958c-932d1934bc25",

      "0f4ed3c6-006f-4acc-b9a6-0640323434b0",

      "86d62bbe-ad84-4491-b787-c7a0bdbb45ea",

      "c1f3b7c3-c216-4bef-835d-b2ef0cd24830",

      "2d3e1c93-55e1-4d39-83f5-9db4c265b985",

      "b84981cc-4cb0-49a0-9002-950273d28a24",

      "77722b00-5cbd-49d6-b62e-67bfc98f3919",

      "1d560e2f-c050-4c1e-88bd-7dd839250228",

      "ae88af02-44eb-4ba9-bb7d-e20a8544badb",

      "23010a1d-a1ff-41d7-93af-3de6a65c2407",

      "ae47aad3-6bcc-40e0-8cab-a40506657abb",

      "95acd14b-a145-4183-98f1-36b8c9570c26",

      "8181525c-6c79-4895-aa62-303a68dd26e6",

      "5628153d-4558-4c35-9071-1190d353b73f",

      "b9f0c06c-55f5-4cb8-98cf-eb96833ff513",

      "d163723c-3cbb-436e-9f36-86ae21305a2e",

      "0e60f739-3a40-4202-b7fd-e9946b9fb4cb",

      "76125b21-a292-4859-ba21-a8b7114a89f1",

      "a7acc003-9c93-4187-861d-57351840b0dd",

      "72ba6b67-3715-4cab-96cf-dd031798e09a",
    ];

    const { data, error } = await supabase.auth.admin.deleteUser(
      '6bbcc82a-6d09-42a6-8761-1fc400052a4c',

      true
    );

    console.log(data, error);

    setResponse({ data, error });
  }

  return (
    <div>
      <button onClick={deleteUsers}>Delete User</button>

      <div>
        {response.data ? (
          <p>User deleted successfully.</p>
        ) : response.error ? (
          <p>Error deleting user: {response.error.message}</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
