// SelectMenuInteraction {
//     type: 'MESSAGE_COMPONENT',
//     id: '946515499657863259',
//     applicationId: '940009232730837053',
//     channelId: '936751708837658629',
//     guildId: '936751708837658625',
//     user: User {
//       id: '225812069704925184',
//       bot: false,
//       system: false,
//       flags: UserFlags { bitfield: 0 },
//       username: 'Rhiona/Vizu',
//       discriminator: '8868',
//       avatar: '2ecf8dee54ad7896c7fbb951ad70fbaa',
//       banner: undefined,
//       accentColor: undefined
//     },
//     member: GuildMember {
//       guild: Guild {
//         id: '936751708837658625',
//         name: "Rhiona/Vizu's server",
//         icon: null,
//         features: [],
//         commands: [GuildApplicationCommandManager],
//         members: [GuildMemberManager],
//         channels: [GuildChannelManager],
//         bans: [GuildBanManager],
//         roles: [RoleManager],
//         presences: PresenceManager {},
//         voiceStates: [VoiceStateManager],
//         stageInstances: [StageInstanceManager],
//         invites: [GuildInviteManager],
//         scheduledEvents: [GuildScheduledEventManager],
//         available: true,
//         shardId: 0,
//         splash: null,
//         banner: null,
//         description: null,
//         verificationLevel: 'NONE',
//         vanityURLCode: null,
//         nsfwLevel: 'DEFAULT',
//         discoverySplash: null,
//         memberCount: 3,
//         large: false,
//         premiumProgressBarEnabled: false,
//         applicationId: null,
//         afkTimeout: 300,
//         afkChannelId: null,
//         systemChannelId: '936751708837658629',
//         premiumTier: 'NONE',
//         premiumSubscriptionCount: 0,
//         explicitContentFilter: 'DISABLED',
//         mfaLevel: 'NONE',
//         joinedTimestamp: 1644188602687,
//         defaultMessageNotifications: 'ALL_MESSAGES',
//         systemChannelFlags: [SystemChannelFlags],
//         maximumMembers: 500000,
//         maximumPresences: null,
//         approximateMemberCount: null,
//         approximatePresenceCount: null,
//         vanityURLUses: null,
//         rulesChannelId: null,
//         publicUpdatesChannelId: null,
//         preferredLocale: 'en-US',
//         ownerId: '225812069704925184',
//         emojis: [GuildEmojiManager],
//         stickers: [GuildStickerManager]
//       },
//       joinedTimestamp: 1643409411408,
//       premiumSinceTimestamp: null,
//       nickname: null,
//       pending: false,
//       communicationDisabledUntilTimestamp: null,
//       _roles: [],
//       user: User {
//         id: '225812069704925184',
//         bot: false,
//         system: false,
//         flags: [UserFlags],
//         username: 'Rhiona/Vizu',
//         discriminator: '8868',
//         avatar: '2ecf8dee54ad7896c7fbb951ad70fbaa',
//         banner: undefined,
//         accentColor: undefined
//       },
//       avatar: null
//     },
//     version: 1,
//     memberPermissions: Permissions { bitfield: 2199023255551n },
//     locale: 'en-US',
//     guildLocale: 'en-US',
//     message: <ref *1> Message {
//       channelId: '936751708837658629',
//       guildId: '936751708837658625',
//       id: '946515480192098364',
//       createdTimestamp: 1645737275885,
//       type: 'APPLICATION_COMMAND',
//       system: false,
//       content: 'Choose a key for Rhiona-Elune',
//       author: ClientUser {
//         id: '940009232730837053',
//         bot: true,
//         system: false,
//         flags: [UserFlags],
//         username: 'Zapros',
//         discriminator: '8178',
//         avatar: '1d8568dc55e2bac377ca1f47c96335b1',
//         banner: undefined,
//         accentColor: undefined,
//         verified: true,
//         mfaEnabled: false
//       },
//       pinned: false,
//       tts: false,
//       nonce: null,
//       embeds: [],
//       components: [ [MessageActionRow] ],
//       attachments: Collection(0) [Map] {},
//       stickers: Collection(0) [Map] {},
//       editedTimestamp: 1645737278988,
//       reactions: ReactionManager { message: [Circular *1] },
//       mentions: MessageMentions {
//         everyone: false,
//         users: Collection(0) [Map] {},
//         roles: Collection(0) [Map] {},
//         _members: null,
//         _channels: null,
//         crosspostedChannels: Collection(0) [Map] {},
//         repliedUser: null
//       },
//       webhookId: '940009232730837053',
//       groupActivityApplication: null,
//       applicationId: '940009232730837053',
//       activity: null,
//       flags: MessageFlags { bitfield: 64 },
//       reference: null,
//       interaction: {
//         id: '946515479252574259',
//         type: 'APPLICATION_COMMAND',
//         commandName: 'update',
//         user: [User]
//       }
//     },
//     customId: 'key-name',
//     componentType: 'SELECT_MENU',
//     deferred: false,
//     ephemeral: null,
//     replied: false,
//     webhook: InteractionWebhook { id: '940009232730837053' },
//     values: [ 'MISTS' ]
//   }


//I have a chain of events that has a menu update itself with new options after a selection is emitted. However, I'm not sure how to store the selected value after one jump
// FILE A
const character_menu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('characterSelected')  // emitting information to FILE B with this ID
            .setPlaceholder('Select Your Character')
            .addOptions(createCharacterArrayForMenu(interaction.user.id))
    );
 // ...
interaction.reply({ content: 'Select a character to update their key data!', components: [character_menu], ephemeral: true }); // interaction being sent to B

// FILE B
const key_type_menu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('key-name') // emitting information to FILE C
            .setPlaceholder('None')
            .addOptions(key_menu)
    );
module.exports = {
    customId: "characterSelected",// receiving character information here as interaction.values from FILE A
    async execute(interaction) {
        let character_selected = interaction.values
        await interaction.update({ content: `Choose a key for: ${character_selected}`, ephemeral: true, components: [key_type_menu] }); //sending a new interaction to FILE C
    },
};
///

///FILE C
module.exports = {
    customId: "key-name", //reading in information from FILE B
    async execute(interaction) {
           console.log(interaction.values) //Only has information from FILE B... not sure how to retain/reach information from A to this point
    },
};

