<template>
  <v-container>
    <p>
      Votre demande de connexion a bien été prise en compte. Un mail va vous
      être envoyé sur l'adresse que vous avez renseignée
      <strong>{{ email }}</strong>
      . Veuillez cliquer sur le lien dans le mail pour confirmer l'activation de
      votre compte.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'AccountRegisterConfirmation',
  props: {
    email: {
      type: String,
    },
  },
};
</script>
