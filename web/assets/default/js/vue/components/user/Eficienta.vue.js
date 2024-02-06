export default {
	template: `
<div class="container mt-6">

	<div class="columns is-justify-content-center has-text-centered">
		
		<div class="column is-12">

			<div class="navigator">
				
				<span class="icon icon-left">
					<i class="far fa-arrow-alt-circle-left" ></i>
				</span>
				
				<span class="month">{{data.currentMonth.name}}</span>

				<span class="icon icon-right">
					<i class="far fa-arrow-alt-circle-right" ></i>
				</span>

			</div>
		</div>
		
	</div>
	
	<div class="is-divider" data-content="Invoice data"></div>
	
	<div class="columns">
		<div class="column is-12">
			<div class="has-text-right">
				<button v-if="stats.everhour.isActive" class="button is-danger" v-on:click="stopEverhour">Stop Everhour</button>
				<button v-if="!stats.everhour.isActive" class="button is-primary" v-on:click="startEverhour">Start Everhour</button>
			</div>
		</div>
	</div>

	<div class="columns ">

		<div class="column is-4">
			<p class="">MonthDays: {{stats.days.total}}</p>
			<p class="">WeekendDays: {{stats.days.weekend}}</p>
			<p class="">WorkDays: {{stats.days.working}}</p>
			<p class="">WorkedDays: {{stats.days.worked}}</p>
		</div>

		<div class="column is-4">
			<p class="">WorkHoursTotal: {{stats.hours.working}}</p>
			<p class="">Everhour(hours): {{stats.hours.everhour}}</p>
			<p class="">FreeDays(hours): {{stats.hours.free}}</p>
			<p class="">DaysOff(hours): {{stats.hours.off}}</p>
			<p class="">Missing(hours): {{stats.hours.missing}}</p>
		</div>

		<div class="column is-4">
			<p class="">Efficiency: {{stats.efficiency.total}}</p>
			<p class="">Efficiency till today: {{stats.efficiency.current}}</p>
		</div>

	</div>

	<div class="columns">
		<div class="column is-12">
			<h3 className="title">Subject</h3>
			<br />
			<p className="subject"><span>monthly efficiency for {{data.name}} - {{data.currentMonth.name}}</span></p>
		</div>
	</div>

	<div class="columns">
		<div class="column is-12">
			<h3 className="title">Body</h3>
			<br />
			<div className="body">
				<p>Hi</p>

				<p>{{data.currentMonth.name}} month efficiency total = {{stats.efficiency.total}}% of {{stats.hours.working}} hours</p>

				<p>
					<span>{{stats.hours.everhour}}h&nbsp;(EverHour)</span>
					<span>&nbsp;+&nbsp;</span>
					<span>{{stats.hours.free}}h(Free days)</span>
					<span>&nbsp;+&nbsp;</span>
					<span>{{stats.hours.off}}h{{((data.daysoffList != null) && data.daysoffList.length) ? ':'+data.daysoffList.join(',') : ''}}(Days off)</span>
					<span>&nbsp;=&nbsp;</span>
					<span>{{stats.hours.everhour + stats.hours.free + stats.hours.off}}h({{stats.efficiency.total}}%)</span>
				</p>

				<p>bye</p>
			</div>
		</div>
	</div>

</div>
	`,
	props: {
		everhourData: Object,
		data: Object,
	},
	data() {

		return {

			stats: {
				everhour: {
					isActive: this.everhourData.isActive
				},
				days: {
					total: this.data.monthDays,
					weekend: this.data.weekendDays,
					working: this.data.monthDays - this.data.weekendDays,
					worked: this.data.workedDays,
					daysoffList: this.data.daysoffList
				},
				hours: {
					working: (this.data.monthDays - this.data.weekendDays) * 8,
					worked: this.data.workedDays * 8,
					everhour: this.everhourData.time,
					free: this.data.freedays * 8,
					off: this.data.daysoff * 8,
					total: (this.data.freedayspast * 8) + (this.data.daysoffpast * 8) + this.everhourData.time,
					missing: (this.data.workedDays * 8) - ( (this.data.freedayspast * 8) + (this.data.daysoffpast * 8) + this.everhourData.time )
				},
				efficiency: {
					total: Math.round(((this.everhourData.time + (this.data.freedayspast * 8) + (this.data.daysoffpast * 8)) * 100 ) / ((this.data.monthDays - this.data.weekendDays) * 8) ),
					current: Math.round(( (this.everhourData.time + (this.data.freedayspast * 8) + (this.data.daysoffpast * 8) ) * 100 ) / (this.data.workedDays * 8) )
				}
			}
		}
	},
	async created(){
		
	},
	components: {
	
	},
	methods: {
		stopEverhour: async function(){
		
			const response = await fetch(`/everhour/stop/`);

			const results = await response.json();

			if(results.status && results.status === 'stopped'){

				this.stats.everhour.isActive = false;

			}
		},
		startEverhour: async function(){
		
			const response = await fetch(`/everhour/start/`);

			const results = await response.json();

			if(results.status && results.status === 'active'){

				this.stats.everhour.isActive = true;

			}
		}
	}

}