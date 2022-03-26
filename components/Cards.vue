<template>
    <v-container>
            <v-col col="12" class="mx-auto my-16 " align="center">
                <v-card width="500px" class=" pa-5 pa-md-16">
                        <v-card-title class="white--text">
                            <slot name="title" />
                        </v-card-title>
                        <v-card-text>
                            <slot name="contents" />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <slot name="buttons" />
                            <v-spacer></v-spacer>
                        </v-card-actions>
                </v-card>
            </v-col>
    </v-container>
</template>