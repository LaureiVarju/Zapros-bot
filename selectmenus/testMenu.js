
const dungeonmenu = 
          
            new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('dungeons')
					.setPlaceholder('Select a dungeon')
					.addOptions([
						{
							label: 'DOS',
							description: 'De Other Side',
							value: 'DOS',
						},
						{
							label: 'HOA',
							description: 'Halls of Atonement',
							value: 'HOA',
						},
						{
							label: 'MISTS',
							description: 'Mists of Tirna Scithe',
							value: 'MISTS',
						},
						{
							label: 'NW',
							description: 'Necrotic Wake',
							value: 'NW',
						},
						{
							label: 'PF',
							description: 'Plaguefall',
							value: 'PF',
						},
						{
							label: 'SD',
							description: 'Sanguine Depths',
							value: 'SD',
						},
						{
							label: 'SOA',
							description: 'Spires of Ascension',
							value: 'SOA',
						},
						{
							label: 'TOP',
							description: 'Theater of Pain',
							value: 'TOP',
						},
					]),
			);

            exports.dungeonmenu = dungeonmenu;