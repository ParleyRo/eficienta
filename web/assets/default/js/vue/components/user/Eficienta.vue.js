export default {
	template: `
<div class="container mt-6">
	<section class="hero">
		<div class="hero-body">
			<p class="title">Eficienta</p>
			<p class="subtitle">{{data.name}}</p>
		</div>
	</section>
	<div class="columns is-justify-content-center has-text-centered">
		
		<div class="column is-12">

			<div class="navigator is-flex is-align-items-center is-justify-content-center">
				
				<a :href="getPreviousMonthUrl()" class="icon icon-left">
					<i class="far fa-arrow-alt-circle-left" ></i>
				</a>
				
				<span class="month">{{data.currentMonth.name}} {{data.currentMonth.year}}</span>

				<a :href="getNextMonthUrl()" class="icon icon-right">
					<i class="far fa-arrow-alt-circle-right" ></i>
				</a>

			</div>
		</div>
		
	</div>

	<p class="py-4"></p>

	<div class="grid" v-if="stats.everhour.isActive !== null">

		<div class="cell">
			<div class="pl-3 has-text-right">
				<p v-if="stats.everhour.taskName"><b>Active task:</b><br>{{stats.everhour.taskName}}</p>
			</div>
		</div>

		<div class="cell">
			<div class="pl-3">
				<button v-if="stats.everhour.isActive" class="button is-danger" v-on:click="stopEverhour">Stop Everhour</button>
				
				<button v-if="!stats.everhour.isActive" class="button is-primary" v-on:click="startEverhour">Start Everhour</button>
			</div>
		</div>
		
	</div>

	<p class="py-4"></p>

	<div class="grid ">

		<div class="cell">
			<div class="pl-3">
				<p class="">MonthDays: {{stats.days.total}}</p>
				<p class="">WeekendDays: {{stats.days.weekend}}</p>
				<p class="">WorkDays: {{stats.days.working}}</p>
				<p class="">WorkedDays: {{stats.days.worked}}</p>
			</div>
		</div>

		<div class="cell">
			<div class="pl-3">
				<p class="">WorkHoursTotal: {{stats.hours.working}}</p>
				<p class="">Everhour: {{stats.hours.everhour}}</p>
				<p class="">FreeDays: {{stats.hours.free}}</p>
				<p class="">DaysOff: {{stats.hours.off}}</p>
				<p v-if="stats.hours.missing != 0" :class="stats.hours.missing > 0 ? 'has-text-danger' : 'has-text-success'">{{stats.hours.missing > 0 ? 'Missing' : 'Over'}}: {{stats.hours.missing > 0 ? stats.hours.missing : stats.hours.missing  * (-1) }}</p>
			</div>
		</div>

		<div class="cell">
			<div class="pl-3">
				<p class="">Efficiency: {{stats.efficiency.total}}%</p>
				<p class="">Efficiency till today: {{stats.efficiency.current}}%</p>
			</div>
		</div>

	</div>
	
	<p class="py-4"></p>
	<hr>
	<p class="py-4"></p>
	
	<div class="columns">
		<div class="column">
			<div class="pl-3">
				<h3 className="title">Subject</h3>
				<br />
				<p className="subject"><span>monthly efficiency for {{data.name}} - {{data.currentMonth.name}}</span></p>
			</div>
		</div>
	
		<div class="column">
			<div class="pl-3">
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
					isActive: null,
					taskName: null
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
		this.refreshEverhourData();
		this.intervalId = setInterval(this.refreshEverhourData, 30000); 
	},
	beforeDestroy() {
		clearInterval(this.intervalId);
	},
	components: {
	
	},
	methods: {
		getPreviousMonthUrl() {

			const currentIndex = new Date().getMonth() + 1;
			if(this.data.prevMonth.index === currentIndex){
				return '/';
			}

			const month = String(this.data.prevMonth.index).padStart(2, '0');
			const year = String(this.data.prevMonth.year);
			return `/time/${month}/${year}`;
		},

		getNextMonthUrl() {

			const currentIndex = new Date().getMonth() + 1;
			if(this.data.nextMonth.index === currentIndex){
				return '/';
			}
			const month = String(this.data.nextMonth.index).padStart(2, '0');
			const year = String(this.data.nextMonth.year);
			
			return `/time/${month}/${year}`;
		},

		async refreshEverhourData() {

			const response = await fetch(`/everhour/status/`);
			const results = await response.json();

			if(results && results.status && (results.status === 'stopped')){

				this.stats.everhour.isActive = false;
				this.stats.everhour.taskName = '';
			}
			
			if (results && results.status && (results.status === 'active')) {
				
				this.stats.everhour.isActive = results.status === 'active';
				this.stats.everhour.taskName = results.task?.name || '';
			}
		},
		stopEverhour: async function(){
		
			const response = await fetch(`/everhour/stop/`);

			const results = await response.json();

			if(results.status && results.status === 'stopped'){

				this.stats.everhour.isActive = false;
				this.stats.everhour.taskName = '';

			}
			
			if(results.redirectUrl){
				window.location.href = results.redirectUrl;
			}	

		},
		startEverhour: async function(){
		
			const response = await fetch(`/everhour/start/`);

			const results = await response.json();

			if(results.status && results.status === 'active'){

				this.stats.everhour.isActive = true;

				this.stats.everhour.taskName = results.task.name;

			}

			if(results.redirectUrl){
				window.location.href = results.redirectUrl;
			}	
		}

		
	}

}